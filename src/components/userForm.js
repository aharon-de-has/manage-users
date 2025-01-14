// import {useState} from 'react';

// const UserForm = ({ user, onSubmit }) => {
//     const [username, setUsername] = useState(user?.username || '');
//     const [fullName, setFullName] = useState(user?.fullName || '');
//     const [email, setEmail] = useState(user?.email || '');
//     const [password, setPassword] = useState('');
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       onSubmit({ username, fullName, email, password });
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
//         <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
//         <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//         <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
//         <button type="submit">Save</button>
//       </form>
//     );
//   };
  
//   export default UserForm;

// import { useState } from 'react';

// const UserForm = ({ user, onSubmit }) => {
//   const [username, setUsername] = useState(user?.username || '');
//   const [fullName, setFullName] = useState(user?.fullName || '');
//   const [email, setEmail] = useState(user?.email || '');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     console.log("🚀 ~ handleSubmit ~ username:", username)
//     const userData = { username, fullName, email, password };

//     try {
//       const response = await fetch('https://server-n42x.onrender.com/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });
//       console.log("🚀 ~ handleSubmit ~ response:", response)

//       if (!response.ok) {
//         throw new Error('Failed to add user');
//       }

//       const data = await response.json();
//       console.log("🚀 ~ handleSubmit ~ data:", data)
//       onSubmit(data); 
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//         required
//       />
//       <input
//         value={fullName}
//         onChange={(e) => setFullName(e.target.value)}
//         placeholder="Full Name"
//         required
//       />
//       <input
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         type="email"
//         required
//       />
//       <input
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         type="password"
//         required
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? 'Saving...' : 'Save'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   );
// };

// export default UserForm;



