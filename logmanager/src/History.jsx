import { useEffect, useState } from "react";
import { API_URL } from "./config";


/* 
    - This page shows information related to the restore page
    - It calls the DB for the user log information which is generated on the restore page
    - This information is then displayed in a table
    - See the Restore page to see how the logs are generated and sent
*/
export default function History() {
    const [rows, setRows] = useState([])
    useEffect(() => {
        fetch(API_URL + "userLogData")
            .then(res => res.json())
            .then(setRows)
            .catch(console.error);

    }, []);
    return (
        <div>
            <h2>User Data</h2>
            <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Previous Authentication state</th>
                        <th>Current Authentication state</th>
                        <th>Date Changed</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.username}</td>
                                <td>{row.email}</td>
                                <td>{row.prev_auth.toString().toUpperCase()}</td>
                                <td>{row.current_auth.toString().toUpperCase()}</td>
                                <td>{row.created_at}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}