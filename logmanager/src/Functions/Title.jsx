import { Link } from "react-router-dom";

export default function Title() {

    return (
        <div className = "title-div" href = "https://logmanager.vercel.app/" >
            <h1 className="title">Log Manager</h1>
            <Link className="title-button"  to={"/Tech"}>
                <button className="tech-button">Tech Area</button>
            </Link>
        </div >
    );
};