import { useState, useEffect } from 'react';
import apiRequest from '../service/apiRequest';
import { useNavigate } from 'react-router-dom';

const useDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiRequest('GET', 'users');
        setUsers(data.map(user => ({ ...user, id: user._id })));
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchUsers();
  }, [users]);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setIsPopupOpen(true);
    setErrorMessage(null);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setIsPopupOpen(true);
    setErrorMessage(null);
  };


  const handleDeleteUser = async (id) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setErrorMessage('No authentication token found');
      return;
    }

    try {
      await apiRequest('DELETE', `users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleFormSubmit = async (userData) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token is missing.');
  
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing
        ? `users/${selectedUser._id}`
        : 'users';

        if (isEditing && !userData.password) {
          delete userData.password;
        }
  
      if (!isEditing && !userData.password) {
        setErrorMessage('Password is required for adding a new user.');
        return;
      }
  
      const data = await apiRequest(method, url, userData);
  
      if (isEditing) {
        setUsers(users.map((user) => (user.id === data.id ? data : user)));
      } else {
        setUsers([...users, data]);
      }
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error submitting user form:', error.message);
    }
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setErrorMessage(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return {
    users,
    selectedUser,
    isPopupOpen,
    isEditing,
    errorMessage,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleFormSubmit,
    handlePopupClose,
    handleLogout
  };
};

export default useDashboard;
