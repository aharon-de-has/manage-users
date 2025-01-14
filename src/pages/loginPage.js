import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, setError } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://server-n42x.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        throw new Error('Invalid username or password');
      }
  
      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      
      dispatch(loginSuccess(data.token));
      
      navigate('/dashboard');
      
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
