import React from 'react';
import useDashboard from '../hooks/useDashboard';
import useLogin from '../hooks/useLogin';
import UserForm from '../components/UserForm';
import ErrorMessage from '../components/ErrorMessage'; 
import './dashboard.css';

const Dashboard = () => {
  const {
    users,
    selectedUser,
    isPopupOpen,
    errorMessage,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleFormSubmit,
    handlePopupClose
  } = useDashboard();

  const { handleLogout } = useLogin();

  return (
    <div>
      <h1>User Dashboard</h1>
      <ErrorMessage message={errorMessage} />
      <button onClick={handleAddUser}>Add User</button>
      <button onClick={handleLogout}>Logout</button>
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
          <UserForm user={selectedUser} onSubmit={handleFormSubmit} onClose={() => handlePopupClose()} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
