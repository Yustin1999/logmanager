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
import Title from "./Functions/Title";
import Archive from "./Pages/Archive";
import Tariff from "./Pages/Tariff";

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
                    <Title />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/History" element={<PrivateRoute> <History /> </PrivateRoute> } />
                        <Route path="/Restore" element={<PrivateRoute> <Restore /> </PrivateRoute> } />
                        <Route path="/" element={<PrivateRoute> <Archive /> </PrivateRoute>} />
                        <Route path="/Tech" element={<PrivateRoute> <Logs /> </PrivateRoute>} />
                        <Route path="/Tariff" element={<PrivateRoute> <Tariff /> </PrivateRoute>} />
                    </Routes>
                    <Footer />
                </Router>
            </AuthProvider>
        
      </div>
  )
}

export default App
