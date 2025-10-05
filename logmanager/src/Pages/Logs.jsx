
import { Link } from "react-router-dom";

/* 
    - This page just generates the URL's and DIVs for each of the pages on the site
*/

export default function Logs() {
    //Can adjust this to pull the logs from a backend or a file
    const folders = ["Scoreboard","WSExit","WSEntry","WSEntryExit","WSMachineData","Misc","Archive","Restore","History"]
    return (
        <div>
            <a className="title" href="https://logmanager.vercel.app/">
                <h1 className="title">Log Manager</h1>
            </a>
        <div className="grid-div">
            
            {folders.map((folder, index) => (
                <Link className="grid-buttons" key={index} to={`/${folder}`}>
                    <h3 className="grid-name">{folder}</h3>
                </Link>
                
            ))}
            
        </div>
        </div >
        
    )
}