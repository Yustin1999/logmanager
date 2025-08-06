import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Logs from './Logs.jsx'
import LogPage from './LogPage.jsx';
import { Link } from "react-router-dom";

function App() {
  

    return (
        
        <div>
            <a className="title" href="http://localhost:59405/">
                <h1 className="title">Log Manager</h1>
            </a>

                

            
            
            <Router>
                <Routes>
                    <Route path="/" element={<Logs />} />
                    <Route path="/folder/:folderName" element={<LogPage />} />
                </Routes>
            </Router>
      </div>
  )
}

export default App
