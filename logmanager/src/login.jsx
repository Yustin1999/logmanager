import React, { useState } from 'react';
import { login } from "../AuthService"
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { jwtDecode } from 'jwt-decode'


export default function Login()  {
  const [email, setEmail] = useState('');
  const { login: setAuth } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement authentication logic here
    if (!email || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
      try {
          
          
          const data = await login(email, password);
          console.log(data)
          
          // Store user info + token in context
          const user = jwtDecode(data.token);
          setAuth(user, data.token);
          console.log(user)
          navigate("/home")
      } catch (err) {
          setError(err.message);
      }
      
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

