import { useState, useEffect } from 'react';
import apiRequest from '../service/apiRequest';

const useDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiRequest('GET', 'users');
        setUsers(data.map(user => ({ ...user, id: user._id })));
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, [users]);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setIsPopupOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setIsPopupOpen(true);
  };


  const handleDeleteUser = async (id) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('No authentication token found');
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

  return {
    users,
    selectedUser,
    isPopupOpen,
    isEditing,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleFormSubmit,
    setIsPopupOpen,
  };
};

export default useDashboard;
