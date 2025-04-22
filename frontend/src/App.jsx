import './App.css';
import { useEffect } from 'react';

const connectString = `http://localhost:${import.meta.env.VITE_API_PORT}/api/` 

function App() {
        useEffect(() => {
                createTable();
        })
        return (
                <>
                <h1> Hello </h1>
                </>
        )
}

async function createTable() {
        try {
                const table = await fetchProjectAssignments();
                table.forEach(async element => {
                        const employeeName = await getAdditionalInfo(`employees/${element.employee_id}`);
                        const projectName = await getAdditionalInfo(`projects/${element.project_code}`);
                        console.log(projectName);
                        console.log(employeeName);
                });
        } catch(error) {
                console.error(error);
        }
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
