import { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Hook to access context easily
export const useAuth = () => useContext(AuthContext);

// Context Provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // {id, email} or null
    const [token, setToken] = useState(null);

    const login = (userData, jwtToken) => {
        setUser(userData);       // {id, email} from login
        setToken(jwtToken);      // JWT string
        localStorage.setItem("token", jwtToken); // persist across refresh
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};