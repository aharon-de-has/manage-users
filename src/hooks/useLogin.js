import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, setError } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../service/apiRequest';

const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await apiRequest('POST', 'auth/login', { username, password });
      localStorage.setItem('authToken', data.token);

      dispatch(loginSuccess(data.token));
      navigate('/dashboard');
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
  };
};

export default useLogin;
