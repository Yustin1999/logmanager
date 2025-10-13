import { API_URL } from "../config";
import { useEffect, useState } from "react";
import download from "../assets/Download.png"
import Downarrow from "../assets/DropDown.svg"
export default function Archive() {
    const [files, setFiles] = useState([]);
    const [isHovered, setIsHovered] = useState(null);
    const [dropDownHovered, setDropDownHovered] = useState(null)
    const [dropDownClicked, setDropDownClicked] = useState(false)
    const handleClick = (e, file) => {
        if (!file) return;
        //console.log(file);
        window.location.href = API_URL + `folder/${encodeURIComponent(file)}`;
    }
    const dropdownClick = (e) => {
        setDropDownClicked(!dropDownClicked)
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
                        
                        <h1 onMouseEnter={() => setDropDownHovered(file[file.length - 1].formattedDate)} onMouseLeave={() => setDropDownHovered(null)}>{file[file.length - 1].formattedDate}{dropDownHovered === file[file.length - 1].formattedDate ? <img className="dropdown" src={Downarrow} onClick={(e) => dropdownClick(e)} /> :""}</h1>
                        {console.log(dropDownHovered)}
                        {dropDownClicked && dropDownHovered === file[file.length - 1].formattedDate && (
                            file.map(f => typeof f !== "object" && (
                                <ul className="list-div" onMouseEnter={() => setIsHovered(f)} onMouseLeave={() => setIsHovered(null)}>

                                    <li key={f} className="files-List">
                                        {f}{""}
                                        {isHovered === f ? <img className="download-image" src={download} value={f} onClick={(e) => handleClick(e, f)} /> : ""}
                                    </li>

                                </ul>

                            )))}
                        
                    </div>
                ))}

            </ul>
            
        </div>
    );
}