import { API_URL } from "../config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Archive() {
    const [files, setFiles] = useState([]);
    const [result, setResult] = useState([]);
    useEffect(() => {
        fetch(API_URL + `archive`)
            .then(res => res.json())
            .then(setFiles)
            .catch(console.error);

        for (let i = 0; i < files[0].length; i++) {
            const group = [];
            for (let j = 0; j < files.length; j++) {
                group.push(files[j][i]);
            }
            setResult(group)
        }
        console.log(files)
    }, []);

    
    



    return (
        <div className="archive-page">
            <ul className="archive-ullist">
                <h1>{result[0][1]}</h1>

            </ul>
            
        </div>
    );
}