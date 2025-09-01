
import { useEffect, useState } from "react";
export default function Restore() {
    const [rows, setRows] = useState([])
    const [log, setLog] = useState([])
    const handleClick =  async (row) => {
        const updatedRow = { ...row, authorization: row.authorization === 1 ? 0 : 1 };
        console.log(updatedRow)
        setLog({ username: updatedRow.username, email: updatedRow.email, prevAuth: (updatedRow.authorization === 1 ? "True" : "False"), currentAuth: (updatedRow.authorization === 1 ? "False" : "True") })
        
        
        
        try {
            const res = await fetch("https://backendproject-it4q.onrender.com/api/updateUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedRow) // send JSON to backend
            });
            const res2 = await fetch("https://backendproject-it4q.onrender.com/api/userLog", {
             //const res2 = await fetch("http://localhost:4000/api/userLog"   
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(log) // send JSON to backend
            });
            
            const data2 = await res2.json
            const data = await res.json();
            console.log("Response from server:", data);
            console.log("Response from server:", data2);
            setRows(prevRows =>
                prevRows.map(r =>
                    r.id === row.id ? { ...r, authorization: r.authorization === 1 ? 0 : 1 } : r,
                    //setLog([row.username, row.email, (row.authorization === 1 ? "True" : "False"), (row.authorization === 1 ? "False" : "True")])
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
    useEffect(() => {
        console.log("log after update:", log);
    }, [log]);
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
                                <td>{row.authorization == 0 ? <button onClick={() => handleClick(row)}>Deauthorise</button> : <button  onClick={() => handleClick(row)}>Authorise</button>}</td>
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