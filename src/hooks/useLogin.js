import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout, setError } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/fetchUsers';

const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password);
      dispatch(loginSuccess(data.token));
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('Server error, please try again')
      dispatch(setError(error.message));
    }
  };

    const handleLogout = () => {
      dispatch(logout());
      navigate('/login');
    };

  return {
    username,
    password,
    errorMessage,
    setUsername,
    setPassword,
    setErrorMessage,
    handleLogin,
    handleLogout
  };
};

export default useLogin;
