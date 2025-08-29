
import { useEffect, useState } from "react";
export default function Restore() {
    const [rows, setRows] = useState([]);
    const handleClick =  async (row) => {
        const updatedRow = { ...row, authorization: row.authorization === 1 ? 0 : 1 };
        
        console.log(row);
        try {
            const res = await fetch("https://backendproject-it4q.onrender.com/api/updateUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedRow) // send JSON to backend
            });

            const data = await res.json();
            console.log("Response from server:", data);
            setRows(prevRows =>
                prevRows.map(r =>
                    r.id === row.id ? { ...r, authorization: r.authorization === 1 ? 0 : 1 } : r
                )
            );
        }
        catch (err) {
            console.log(err)
        }

    };
    useEffect(() => {
        fetch(`https://backendproject-it4q.onrender.com/api/userdata`)
        //fetch(`http://localhost:4000/api/userdata`)
            .then(res => res.json())
            .then(setRows)
            .catch(console.error);
            
    }, []);
    
    return (
        //Link to a and change a 0 to a 1
        <div>
            <h2>User Data</h2>
            <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Authorised</th>
                        <th>Change Authorisation</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.username}</td>
                                <td>{row.email}</td> 
                                <td>{row.authorization == 0 ? "Yes" : "No"}</td>
                                <td>{row.authorization == 0 ? <button onClick={(e) => handleClick(row)}>Deauthorise</button> : <button  onClick={(e) => handleClick(row)}>Authorise</button>}</td>
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