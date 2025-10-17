import { API_URL } from "../config";
import { useEffect, useState } from "react";
import download from "../assets/Download.png"
import Downarrow from "../assets/DropDown.svg"
export default function Archive() {
    const [files, setFiles] = useState([]);
    const [isHovered, setIsHovered] = useState(null);
    const [dropDownHovered, setDropDownHovered] = useState(null);
    const handleClick = (e, file) => {
        if (!file) return;
        //console.log(file);
        window.location.href = API_URL + `folder/${encodeURIComponent(file)}`;
    }
    
    const Dropper = (date, file) => {
        const index = file.findIndex(item => item[item.length-1].formattedDate === date );

        const nextList = file.map((item, i) => {
            if (i === index) {
                
                return [
                    ...item.slice(0, item.length - 1),
                    { ...item[item.length - 1], state: !item[item.length - 1].state }
                ];
            }
            return item;
        });
        
        setFiles(nextList);
        
    }
    

    useEffect(() => {
        fetch(API_URL + "archive")
            .then(res => res.json())
            .then(data => {
                setFiles(data);
            })
            
            .catch(console.error);
    }, []);


    //Possible solutions add a true/false to each date object to check if its clicked or not when true it will render the dropdown
    //{setDropdownBool([...dropdownBool, [file[file.length - 1].formattedDate, file[file.length - 1].state]])}



    return (
        <div className="archive-page">
            
            {files.map(file =>  (
                <ul onMouseLeave={() => { setDropDownHovered(null); }}  className="logs-list">
                    
                   
                    <h1 onClick={() => Dropper(dropDownHovered, files)}  onMouseEnter={() => setDropDownHovered(file[file.length - 1].formattedDate)}>{file[file.length - 1].formattedDate}{dropDownHovered === file[file.length - 1].formattedDate ? <img className="dropdown" onClick={() => Dropper(dropDownHovered,files) } src={Downarrow} /> :""}</h1>
                    {file[file.length - 1].state  && (

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