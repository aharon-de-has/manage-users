import useLogin from '../hooks/useLogin';
import ErrorMessage from '../components/ErrorMessage';

const LoginPage = () => {
  const { 
    username, 
    password,
    errorMessage,
    setUsername, 
    setPassword, 
    setErrorMessage, 
    handleLogin 
  } = useLogin();

  return (
    <form onSubmit={handleLogin}>
      <ErrorMessage message={errorMessage} />

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
          setErrorMessage('')
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setErrorMessage('')
        }}
      />
      <button type="submit" disabled={!username || !password || Boolean(errorMessage)}>Login</button>
    </form>
  );
};

export default LoginPage;

