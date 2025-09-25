import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


/* 
    - Checks a webtoken exists and allows page navigation if so
    - If one does not exist it will redirect to the login page
*/
export default function PrivateRoute({ children }) {
    
    
    const { user } = useAuth();
    console.log("PrivateRoute user:", user);
    // If user exists in context, render children
    if (user) return children;

    // Otherwise redirect to login
    return <Navigate to="/login" replace />;
}