import { API_URL } from "../config";
import { useEffect, useState } from "react";
import download from "../assets/Download.png"
export default function Archive() {
    const [files, setFiles] = useState([]);
    const [isHovered, setIsHovered] = useState(null);
    const array = [];
    const handleClick = (e, file) => {
        if (!file) return;
        //console.log(file);
        window.location.href = API_URL + `folder/${encodeURIComponent(file)}`;
    }
    useEffect(() => {
        fetch(API_URL + "archive")
            .then(res => res.json())
            .then(data => {
                console.log("Fetched data:", data);
                setFiles(data);
                
            })
            .catch(console.error);
    }, []);


    




    return (
        <div className="archive-page">
            <ul className="logs-list">
                {files.map(file => (
                    
                    <div>
                        
                        <h1>{file[file.length - 1].formattedDate}</h1>
                        { array = file.filter(item => typeof item === "string")};
                        {array.map(f => ( 
                            
                            <ul className="list-div" onMouseEnter={() => setIsHovered(f)} onMouseLeave={() => setIsHovered(null)}>
                                
                                <li key={f} className="files-List">
                                    {Array.isArray(f) ? "" : f}{""}
                                    {isHovered === f ? <img className="download-image" src={download} value={f} onClick={(e) => handleClick(e, f)} /> : ""}
                                </li>
                                
                            </ul>
                        
                        ))}
                        
                    </div>
                ))}

            </ul>
            
        </div>
    );
}