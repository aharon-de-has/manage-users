import { useState } from 'react';
import ErrorMessage from './ErrorMessage'; 

interface User {
  _id?: string;
  username?: string;
  fullName?: string;
  email?: string;
}

const UserForm = ({ user, onSubmit, onClose }: { user: User; onSubmit: any; onClose: any }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setLoading(true); 
    setError(null); 
  
    const userData = { username, fullName, email, password };
  
    try {
      await onSubmit(userData); 
    } catch (err: any) {
      console.error('Error saving user:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ErrorMessage message={error?? undefined} />

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
        required
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <div className="flex justify-between">
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </form>
  );
};

export default UserForm;