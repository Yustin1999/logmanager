/* eslint-disable no-undef */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import download from "./assets/Download.png"
export default function FolderPage() {
    const { folderName } = useParams();
    const [files, setFiles] = useState([]);
    const [isHovered, setIsHovered] = useState(null)
    const handleClick = (e, file) => {
        if (!file) return;
        console.log(file);
        window.location.href = `https://backendproject-it4q.onrender.com/api/folder/${folderName}/${encodeURIComponent(file)}`;
    }

    useEffect(() => {
        fetch(`https://backendproject-it4q.onrender.com/api/folder/${folderName}/logs`)
            .then(res => res.json())
            .then(setFiles)
            .catch(console.error);
            console.log("Files", files)
    }, [folderName]);
   
    

    return (
        <div>
            <h1 className="title">Folder: {folderName}</h1>
            <ul className="logs-list">
                {files.map(file => (
                    <div className="list-div" onMouseEnter={() => setIsHovered(file.name)} onMouseLeave={() => setIsHovered(null)}>
                        
                    
                    <li key={file.name} className="Files-List">
                        {file.name}{""}
                            {isHovered === file.name ? <img className="download-image" src={download} value={file.contents} onClick={(e) => handleClick(e, file.name)} /> : ""}
                    </li>
                        
                    </div>
                ))}
                
            </ul>
        </div>
    );
}