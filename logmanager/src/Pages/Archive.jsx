import { API_URL } from "../config";
import { useEffect, useState } from "react";
import download from "../assets/Download.png"
import Downarrow from "../assets/DropDown.svg"
export default function Archive() {
    const [files, setFiles] = useState([]);
    const [isHovered, setIsHovered] = useState(null);
    const [dropDownHovered, setDropDownHovered] = useState(null);
    const [dropDownClicked, setDropDownClicked] = useState(null);
    const [dropDownBool, setDropDownBool] = useState([]);
    const handleClick = (e, file) => {
        if (!file) return;
        //console.log(file);
        window.location.href = API_URL + `folder/${encodeURIComponent(file)}`;
    }
    

    

    useEffect(() => {
        fetch(API_URL + "archive")
            .then(res => res.json())
            .then(data => {
                setFiles(data);
                const dropdownArray = data.map(file => [
                    file[file.length - 1].formattedDate,
                    false
                    
                ]);


                console.log("Dropdown array:", dropdownArray);

                setDropDownBool(dropdownArray);
                
            })
            
            .catch(console.error);
    }, []);


    //Possible solutions add a true/false to each date object to check if its clicked or not when true it will render the dropdown
    //{setDropdownBool([...dropdownBool, [file[file.length - 1].formattedDate, file[file.length - 1].state]])}



    return (
        <div className="archive-page">
           
            {files.map(file => (
                <ul onMouseLeave={() => { setDropDownHovered(null); setDropDownClicked(null); }}  className="logs-list">
                    
                    <h2>{dropDownBool[0].formattedDate}</h2>
                        <h1 onMouseEnter={() => setDropDownHovered(file[file.length - 1].formattedDate)}>{file[file.length - 1].formattedDate}{dropDownHovered === file[file.length - 1].formattedDate ? <img className="dropdown" onClick={() => setDropDownClicked(!dropDownClicked) } src={Downarrow} /> :""}</h1>
                        {dropDownHovered === file[file.length - 1].formattedDate && dropDownClicked && (

                            file.map(f => typeof f !== "object" && (
                                <ul className="list-div" onMouseEnter={() => setIsHovered(f)} onMouseLeave={() => setIsHovered(null)}>

                                    <li key={f} className="files-List">
                                        {f}{""}
                                        {isHovered === f ? <img className="download-image" src={download} value={f} onClick={(e) => handleClick(e, f)} /> : ""}
                                    </li>

                                </ul>

                            )))} 
                        
                        
                    </ul>
                ))}

            
            
        </div>
    );
}