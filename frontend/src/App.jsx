import './App.css';
import { useEffect, useState } from 'react';

const connectString = import.meta.env.VITE_API_URL || `http://localhost:${import.meta.env.VITE_API_PORT}/api/` 

/**
 * Main App component that fetches, displays, and allows sorting of
 * project assignment data in a table format.
 */
function App() {
        // State to hold the table data fetched from the backend
        const [tableData, setTableData] = useState([]);

        // State to hold the current sorting key
        const [sorting, setSorting] = useState(null);

        /**
         * useEffect hook to load the data when the component mounts,
         * and refresh it every 1 second (1000ms).
         */
        useEffect(() => {
                async function loadTableData() {
                        try {
                                // Fetch and set the formatted table data
                                setTableData(await buildTable());
                        } catch (error) {
                                console.error(error); // Log any errors
                        }
                }

                loadTableData(); // Initial load

                // Set up periodic data refresh
                const interval = setInterval(() => {
                        loadTableData();
                }, 60000);

                // Clean up interval on component unmount
                return () => clearInterval(interval);
        }, []);

        /**
         * Sorts the table data based on the selected column.
         */
        const sortedTable = [...tableData].sort((a, b) => {
                if (!sorting) return 0; // No sorting key selected
                if (a[sorting] < b[sorting]) return -1;
                if (a[sorting] > b[sorting]) return 1;
                return 0;
        });

        /**
         * Renders the project assignment table with sortable headers.
         */
        return (
                <div>
                <h1>Project Assignments</h1>
                <table>
                <thead>
                <tr>
                <th onClick={() => setSorting("employeeId")}>Employee ID</th>
                <th onClick={() => setSorting("employeeName")}>Employee Name</th>
                <th onClick={() => setSorting("projectName")}>Project Name</th>
                <th onClick={() => setSorting("startDate")}>Start Date</th>
                </tr>
                </thead>
                <tbody>
                {sortedTable.map((row, index) => (
                        <tr key={index}>
                        <td>{row.employeeId}</td>
                        <td>{row.employeeName}</td>
                        <td>{row.projectName}</td>
                        <td>{row.startDate}</td>
                        </tr>
                ))}
                </tbody>
                </table>
                </div>
        );
}

/**
 * Builds the complete table data by fetching assignment records
 * and enriching them with employee and project names.
 *
 * @returns {Promise<Array>} - An array of formatted assignment records.
 */
async function buildTable() {
        const basicData = await fetchProjectAssignments();

        // Enrich each assignment with employee and project names
        const fullData = await Promise.all(
                basicData.map(async (element) => {
                        const employeeName = await getAdditionalInfo(`employees/${element.employee_id}`);
                        const projectName = await getAdditionalInfo(`projects/${element.project_code}`);

                        return {
                                employeeId: element.employee_id,
                                startDate: element.start_date,
                                employeeName: employeeName,
                                projectName: projectName,
                        };
                })
        );
        return fullData;
}

/**
 * Fetches the latest 5 project assignments sorted by start date.
 *
 * @returns {Promise<Array>} - The most recent assignment records.
 */
async function fetchProjectAssignments() {
        let latestProjectAssignments;
        try {
                const data = await fetch(connectString + "project_assignments");
                let table = await data.json();

                // Sort by most recent start date
                table.sort((a, b) => Date.parse(b.start_date) - Date.parse(a.start_date));

                // Return only the top 5
                latestProjectAssignments = table.slice(0, 5);
        } catch(error){
                console.error(error);
        }
        return latestProjectAssignments;
}

/**
 * Fetches either employee or project info by API path and extracts the name.
 *
 * @param {string} path - The API path to fetch from.
 * @returns {Promise<string>} - The full name of the employee or project.
 */
async function getAdditionalInfo(path) {
        let name;
        try {
                const data = await fetch(connectString + path);
                let [fetchedData] = await data.json();

                // Determine name field based on endpoint
                if (path.includes("employees")) {
                        name = fetchedData.full_name;
                } else {
                        name = fetchedData.project_name;
                }
        } catch(error) {
                console.error(error);
        }
        return name;
}

export default App;
