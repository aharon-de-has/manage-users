import { useState, useEffect } from 'react';
import { getAllUsers, addUser, editUser, deleteUser } from '../service/fetchUsers';
import  store  from '../redux/store';

interface User {
  _id: string;
  id?: string; 
  username?: string;
  fullName?: string;
  email?: string;
  password?: string;
}

const useDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<{ _id: string } | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        const data = await response.json();
        if (data.message === 'Access token is missing or invalid') {
          setErrorMessage('Access token is missing or invalid');
          return;
        }
     
        setUsers(data.map((user: { _id: string }) => ({ ...user, id: user._id })));
      } catch (error: any) {
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


  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditing(true);
    setIsPopupOpen(true);
    setErrorMessage(null);
  };

  const handleDeleteUser = async (id: string) => {
    const token = store.getState().auth.token;
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
    } catch (error: any) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleFormSubmit = async (userData: Partial<User>) => {
    try {
      const token = store.getState().auth.token;
      if (!token) throw new Error('Authentication token is missing.');

        if (isEditing && !userData.password) {
          delete userData.password;
        }
  
      if (!isEditing && !userData.password) {
        setErrorMessage('Password is required for adding a new user.');
        return;
      }
  
      const response = await (isEditing ? editUser(selectedUser?._id || '', userData) : addUser(userData));
      const data = await response.json();

      if (isEditing) {
        setUsers(users.map((user) => (user._id === data._id ? { ...user, ...data } : user)));

      } else {
        setUsers([...users, { ...data, id: data._id }]); 

      }
      setIsPopupOpen(false);
    } catch (error: any) {
      if (error.message === 'Authentication token is missing.') {
        setErrorMessage('Authentication token is missing.');
        return;
      }
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
