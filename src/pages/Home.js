import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to the manage-users!</h1>
      <button onClick={() => navigate('/login')}>lets go</button>
    </div>
  );
};

export default Home;
