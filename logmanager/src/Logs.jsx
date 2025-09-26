import './App.css'
import { Link } from "react-router-dom";

/* 
    - This page just generates the URL's and DIVs for each of the pages on the site
*/

export default function Logs() {
    //Can adjust this to pull the logs from a backend or a file
    const folders = ["Scoreboard","WSExit","WSEntry","WSEntryExit","WSMachineData","Misc","Archive","Restore","History"]
    return (
        <div className="grid-div">
            {folders.map((folder, index) => (
                <Link className="grid-buttons" key={index} to={`/folder/${folder}`}>
                    <h3>{folder}</h3>
                </Link>
                
            ))}
            
        </div>
        
    )
}