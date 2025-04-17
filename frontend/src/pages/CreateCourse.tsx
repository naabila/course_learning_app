import React from 'react';
import CourseForm from '../components/CourseForm';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const CreateCourse: React.FC = () => {
  const { userRole, loading } = useAuth();

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (userRole !== 'teacher') {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Create a New Course</h2>
      <CourseForm />
    </div>
  );
};

export default CreateCourse;