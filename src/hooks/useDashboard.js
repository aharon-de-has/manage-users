import { useState, useEffect } from 'react';

const useDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      try {
        const response = await fetch('https://server-n42x.onrender.com/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch users');

        const data = await response.json();
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
      const response = await fetch(`https://server-n42x.onrender.com/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete user');
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
        ? `https://server-n42x.onrender.com/api/users/${selectedUser._id}`
        : 'https://server-n42x.onrender.com/api/users';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save user. Status code: ${response.status}`);
      }

      const data = await response.json();
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
