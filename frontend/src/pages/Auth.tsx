import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth: React.FC = () => {
  const { setUserRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        try {
          await axios.post(
            'http://localhost:5000/api/v1/users',
            { firebaseUid: user.uid, name, email, role },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUserRole(role);
        } catch (error: any) {
          await auth.signOut();
          throw new Error(error.response?.data?.errorMessage || 'Registration failed');
        }
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/${userCredential.user.uid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserRole(response.data.data.role);
      }
      navigate('/');
    } catch (error: any) {
      alert(error.message || 'Authentication failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{isRegister ? 'Register' : 'Login'}</h2>
      <div>
        {isRegister && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'student' | 'teacher')}
                className="w-full p-2 border rounded"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </div>
      <p className="mt-4">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-blue-500 underline"
        >
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default Auth;