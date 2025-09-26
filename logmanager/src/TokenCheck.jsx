import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

/* 
    - Checks a webtoken exists and allows page navigation if so
    - If one does not exist it will redirect to the login page
*/

export default function PrivateRoute({ children }) {
    
    const now = Math.floor(Date.now() / 1000);
    const { user } = useAuth();
    //console.log("PrivateRoute user:", user);
    
    if (user && user.exp && user.exp > now) return children;

    
    return <Navigate to="/login" replace />;
}