import React from 'react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/auth');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Course Learning App</h1>
        <div>
          {currentUser ? (
            <>
              <span className="mr-4">Welcome, {currentUser.email} ({userRole})</span>
              {userRole === 'teacher' && (
                <button
                  onClick={() => navigate('/create-course')}
                  className="mr-4 bg-green-500 px-4 py-2 rounded"
                >
                  Create Course
                </button>
              )}
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/auth')} className="bg-green-500 px-4 py-2 rounded">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;