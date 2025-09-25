import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Logs from './Logs.jsx'
import LogPage from './LogPage.jsx';
import Tariff from './Tariff.jsx'
import Restore from './Restore.jsx'
import History from './History.jsx'
import Login from "./login";
import PrivateRoute from "./TokenCheck";
import { AuthProvider } from "./AuthContext";

function App() {
  

    return (
        
        <div>
            <a className="title" href="https://logmanager.vercel.app/">
                <h1 className="title">Log Manager</h1>
            </a>

                

            
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/folder/History" element={<PrivateRoute> <History /> </PrivateRoute> } />
                        <Route path="/folder/Restore" element={<PrivateRoute> <Restore /> </PrivateRoute> } />
                        <Route path="/home" element={<PrivateRoute> <Logs /> </PrivateRoute> } />
                        <Route path="/folder/Tariff" element={<PrivateRoute> <Tariff /> </PrivateRoute>} />
                        <Route path="/folder/:folderName" element={<PrivateRoute> <LogPage /> </PrivateRoute>} />
                    </Routes>
                </Router>
        </AuthProvider>
      </div>
  )
}

export default App
