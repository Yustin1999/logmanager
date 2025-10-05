import { createContext, useContext, useState } from "react";


const AuthContext = createContext();


export function useAuth() {
    return useContext(AuthContext);
} 


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
        // localStorage.setItem("token", jwtToken);
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
}