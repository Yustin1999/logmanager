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
        console.log(files[0][0]);
    }, []);

    useEffect(() => {
        if (Array.isArray(files) && files.length > 0 && Array.isArray(files[0])) {
            const grouped = [];

            for (let i = 0; i < files[0].length; i++) {
                const group = [];
                for (let j = 0; j < files.length; j++) {
                    group.push(files[j][i]);
                }
                grouped.push(group);
            }

            setResult(grouped);
        }
        //console.log(result[0][0]);
    }, [files]);
    
    



    return (
        <div className="archive-page">
            <ul className="archive-ullist">
                {result.length > 0 ? <h1>{result[0][0]}</h1> : <h3>Loading...</h3> }
            </ul>
            
        </div>
    );
}