import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Logs from './Logs.jsx'
import LogPage from './LogPage.jsx';
import Tariff from './Tariff.jsx'
import Restore from './Restore.jsx'
import History from './History.jsx'


function App() {
  

    return (
        
        <div>
            <a className="title" href="https://logmanager.vercel.app/">
                <h1 className="title">Log Manager</h1>
            </a>

                

            
            
            <Router>
                <Routes>
                    <Route path="/" element={<Logs />} />
                    <Route path="/folder/History" element={<History />} />
                    <Route path="/folder/Restore" element={<Restore />} />
                    <Route path="/folder/Tariff" element={<Tariff />} />
                    <Route path="/folder/:folderName" element={<LogPage />} />
                </Routes>
            </Router>
      </div>
  )
}

export default App
