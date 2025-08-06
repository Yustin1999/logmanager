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
        window.location.href = `http://localhost:4000/api/folder/${folderName}/${encodeURIComponent(file)}`;
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/folder/${folderName}/logs`)
            .then(res => res.json())
            .then(setFiles)
            .catch(console.error);
    }, [folderName]);

    

    return (
        <div>
            <h1 className="title">Folder: {folderName}</h1>
            <ul className="logs-list">
                {files.map(file => (
                    <div className="list-div" onMouseEnter={() => setIsHovered(file)} onMouseLeave={() => setIsHovered(null)}>
                        
                    
                    <li key={file} className="Files-List">
                        {file}{""}
                            {isHovered === file ? <img className="download-image" src={download} value={file} onClick={(e) => handleClick(e, file)} /> : ""}
                    </li>
                        
                    </div>
                ))}
                
            </ul>
        </div>
    );
}