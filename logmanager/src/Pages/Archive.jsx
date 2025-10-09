import { API_URL } from "../config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Archive() {
    const [files, setFiles] = useState([]);
    const [result, setResult] = useState([]);
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
                        <h1>date</h1>
                        {file.map(f => ( 
                            <ul>
                                <li key={f} className="files-List">
                                    {f}{""}
                                </li>
                            </ul>
                        
                        ))}
                        
                    </div>
                ))}

            </ul>
            
        </div>
    );
}