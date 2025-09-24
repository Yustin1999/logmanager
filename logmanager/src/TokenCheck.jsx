import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }) {
    
    
    const { user } = useAuth();
    console.log("PrivateRoute user:", user);
    // If user exists in context, render children
    if (user) return children;

    // Otherwise redirect to login
    return <Navigate to="/login" replace />;
}