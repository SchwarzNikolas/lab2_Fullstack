import './App.css';
import { useEffect, useState } from 'react';

const connectString = `http://localhost:${import.meta.env.VITE_API_PORT}/api/` 

function App() {
        const [tableData, setTableData] = useState([]);

        useEffect(() => {
                async function loadTableData() {
                        try {
                                const rawData = await fetchProjectAssignments();

                                const enrichedData = await Promise.all(
                                        rawData.map(async (element) => {
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
                                setTableData(enrichedData);
                        } catch (error) {
                                console.error(error);
                        }
                }

                loadTableData();
        }, []);

        return (
                <div>
                <h1>Project Assignments</h1>
                <table>
                <thead>
                <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Project Name</th>
                <th>Start Date</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((row, index) => (
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

async function fetchProjectAssignments() {
        let latestProjectAssignments;
        try {
                const data = await fetch(connectString + "project_assignments");
                let table = await data.json();
                table.sort((a, b) => Date.parse(b.start_date) - Date.parse(a.start_date));
                latestProjectAssignments = table.slice(0, 5);
        } catch(error){
                console.error(error);
        }
        return latestProjectAssignments;
}

async function getAdditionalInfo(path) {
        let name;
        try {
                const data = await fetch(connectString + path);
                let [fetchedData] = await data.json();
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

export default App
