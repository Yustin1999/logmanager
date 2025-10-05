import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './Styles/App.css'
import Logs from './Pages/Logs.jsx'
import LogPage from './Pages/LogPage.jsx';
import Restore from './Pages/Restore.jsx'
import History from './Pages/History.jsx'
import Login from "./Pages/login";
import PrivateRoute from "./Functions/TokenCheck";
import { AuthProvider } from "./Functions/AuthContext";
import Footer from "./Functions/footer";
import "@fontsource/dm-serif-text"; 

/* 
    - Contains all the routes for the project and the path to get to them
    - <PrivateRoute> checks for a web token and will redirect to /login if one does not exist
*/

function App() {
    //{<Route path="/folder/Tariff" element={<PrivateRoute> <Tariff /> </PrivateRoute>} />}

    return (
        
        <div>
            

                

            
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="=/History" element={<PrivateRoute> <History /> </PrivateRoute> } />
                        <Route path="/Restore" element={<PrivateRoute> <Restore /> </PrivateRoute> } />
                        <Route path="/" element={<PrivateRoute> <Logs /> </PrivateRoute> } />
                        <Route path="/:folderName" element={<PrivateRoute> <LogPage /> </PrivateRoute>} />
                    </Routes>
                </Router>
            </AuthProvider>
        <Footer/>
      </div>
  )
}

export default App
