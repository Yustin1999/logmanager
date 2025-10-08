import { API_URL } from "../config";
import { useEffect, useState } from "react";

/* 
     - Firstly calls the userdata from the DB which is presented on the page in a table
     - Depending on the authorisation state in the DB a button will appear in the table which will auth/de-auth depending on the state
     - The button will then change the authorisation state to the oposite value TRUE -> FALSE, FALSE -> TRUE.
     - On click this information is sent to the DB and the state updates, resulting in the new value be shown on the page shortly after it is clicked.
     - The click also generate a log of the changes made which is then sent to a seperate table to be displayed on the log page
*/
export default function Restore() {
    const [rows, setRows] = useState([])
    const [log, setLog] = useState([])
    const handleClick =  async (row) => {
        const updatedRow = { ...row, is_authorised: row.is_authorised === 1 ? 0 : 1 };
        console.log(updatedRow)
        setLog({ username: updatedRow.username, email: updatedRow.email, prevAuth: (updatedRow.is_authorised === 1 ? true : false), currentAuth: (updatedRow.is_authorised === 1 ? false : true) })
        
        
        
        try {
            const res = await fetch(API_URL + "updateUser", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedRow) // send JSON to backend
            });
            const res2 = await fetch(API_URL + "userLog", { 
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
                    r.id === row.id ? { ...r, is_authorised: r.is_authorised === 1 ? 0 : 1 } : r,
                    //setLog([row.username, row.email, (row.authorization === 1 ? "True" : "False"), (row.authorization === 1 ? "False" : "True")])
                )
               
            );
            
            
            
            
        }
        catch (err) {
            console.log(err)
        }

    };
    useEffect(() => {
        fetch(API_URL + "userdata")
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
                                <td>{row.is_authorised == 0 ? "Yes" : "No"}</td>
                                <td>{row.is_authorised == 0 ? <button onClick={() => handleClick(row)}>Deauthorise</button> : <button  onClick={() => handleClick(row)}>Authorise</button>}</td>
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