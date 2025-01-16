import { useState, useEffect } from 'react';
import { getAllUsers, addUser, editUser, deleteUser } from '../service/fetchUsers';

const useDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        const data = await response.json();
        setUsers(data.map(user => ({ ...user, id: user._id })));
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchUsers();
  }, []);

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
      const response = await deleteUser(id);
      if (response.status === 500) {
        setErrorMessage('Failed to delete user');
        return;
      }
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleFormSubmit = async (userData) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token is missing.');

        if (isEditing && !userData.password) {
          delete userData.password;
        }
  
      if (!isEditing && !userData.password) {
        setErrorMessage('Password is required for adding a new user.');
        return;
      }
  
      const response = await (isEditing ? editUser(selectedUser._id, userData) : addUser(userData));
      const data = await response.json();

      if (isEditing) {
        setUsers(users.map((user) => (user._id === data._id ? { ...user, ...data } : user)));

      } else {
        setUsers([...users, { ...data, id: data._id }]); 

      }
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error submitting user form:', error.message);
      setErrorMessage('Server error, please try again')
    }
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setErrorMessage(null);
  };


  return {
    users,
    selectedUser,
    isPopupOpen,
    isEditing,
    errorMessage,
    setErrorMessage,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleFormSubmit,
    handlePopupClose
  };
};

export default useDashboard;
