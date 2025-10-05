import React, { useState } from 'react';
import { login } from "../Functions/AuthService"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Functions/AuthContext";
import { jwtDecode } from 'jwt-decode'

/* 
    - Displays a form allowing the user to enter their email and password
    - On submit this information is set to the DB to check the password and email match one in the DB
    - Once this is confirmed a JWT is generated and sent back from the backend which is then stored in localstorage so the user can access all pages.
*/

export default function Login()  {
  const [email, setEmail] = useState('');
  const { login: setAuth } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
      try {
          const data = await login(email, password);
          const user = jwtDecode(data.token);
          setAuth(user, data.token);
          navigate("/")
      } catch (err) {
          setError(err.message);
      }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
              <h2 className="login-title">Login</h2>
        
        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
              <div className="form-row">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
              <button type="submit" className="login-submit">Log In</button>
              {error && <div className="login-error">Error: {error}</div>}
      </form>
    </div>
  );
};

