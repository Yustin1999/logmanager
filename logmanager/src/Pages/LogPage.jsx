import { API_URL } from "../config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import download from "../assets/Download.png"

/* 
    - Calls the backend for all of the names of the log files
    - Depending on the page it will pull a different set of log files, useParams() is what allows this to work. The end of the url is then sent to the backend eg 'scoreboard.
    - This is also used to choose the correct file to download, when click download it will send the name of the file you click aswell as the page you are currently on
    - URL will look like this https://backendproject-it4q.onrender.com/api/folder/scoreboard/scoreboard.txt
    - Also has a ternary operator to display the download symbol on hover.
*/

export default function FolderPage() {
    const { folderName } = useParams();
    const [files, setFiles] = useState([]);
    const [isHovered, setIsHovered] = useState(null)
    const handleClick = (e, file) => {
        if (!file) return;
        console.log(file);
        window.location.href = API_URL + `folder/${folderName}/${encodeURIComponent(file)}`;
    }

    useEffect(() => {
        fetch(API_URL + `folder/${folderName}/logs`)
            .then(res => res.json())
            .then(setFiles)
            .catch(console.error);
            console.log("Files", files)
    }, [folderName]);
   
    return (
        <div className="files-page">

            <a className="title" href="https://logmanager.vercel.app/">
                <h1 className="title">Log Manager</h1>
            </a>
            <ul className="logs-list">
                {files.map(file => (
                    <div className="list-div" onMouseEnter={() => setIsHovered(file)} onMouseLeave={() => setIsHovered(null)}>
                        
                    
                    <li key={file} className="files-List">
                        {file}{""}
                            {isHovered === file ? <img className="download-image" src={download} value={file} onClick={(e) => handleClick(e, file)} /> : ""}
                    </li>
                        
                    </div>
                ))}
                
            </ul>
        </div>
    );
}