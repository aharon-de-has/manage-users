import { useState, useEffect } from 'react';
import UserForm from './userForm';
import './dashboard.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

useEffect(() => {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      console.error('No authentication token found');
      return; 
    }
  
    fetch('https://server-n42x.onrender.com/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,  
      },
    })
      .then((response) => response.json())
    .then((data) => {
        setUsers(data.map(user => ({ ...user, id: user._id })));  
      })
      .catch((error) => console.error('Error fetching users:', error));
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


const handleDeleteUser = (id) => {
    const token = localStorage.getItem('authToken');  
  
    if (!token) {
      console.error('No authentication token found');
      return; 
    }
  
    fetch(`https://server-n42x.onrender.com/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,  
      },
    })
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error('Error deleting user:', error));
  };
  
const handleFormSubmit = async (userData) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token is missing.');

      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing
        ? `https://server-n42x.onrender.com/api/users/${selectedUser.id}`
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
        console.log('User edited:', data);
        setUsers(users.filter((user) => user.id !== data.id));
      } else {
        setUsers([...users, data]);
      }
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error submitting user form:', error.message);
    }
  };
  

  return (
    <div>
      <h1>User Dashboard</h1>
      <button onClick={handleAddUser}>Add User</button>
      <button onClick={() => localStorage.removeItem('authToken')}>logout</button>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {Array.isArray(users) && users.map((user) => (
                <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
      <button onClick={() => handleEditUser(user)}>Edit</button>
      <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
    </td>
  </tr>
))}

        </tbody>
      </table>

      {isPopupOpen && (
        <div className="popup">
          <UserForm user={selectedUser} onSubmit={handleFormSubmit} />
          <button onClick={() => setIsPopupOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;