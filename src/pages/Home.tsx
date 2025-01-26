import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to the manage-users!</h1>
      <button onClick={() => navigate('/login')}>let's go</button>
    </div>
  );
};

export default Home;
