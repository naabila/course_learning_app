import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Course {
  _id: string;
  title: string;
  description: string;
  teacher: { name: string };
  views: number;
  likes: string[];
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = async () => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    const token = await currentUser.getIdToken();
    try {
      await axios.post(
        `http://localhost:5000/api/v1/courses/${course._id}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Enrolled successfully!');
    } catch (error) {
      alert('Error enrolling in course');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-xl font-bold">{course.title}</h3>
      <p className="text-gray-600">{course.description}</p>
      <p className="text-sm text-gray-500">Teacher: {course.teacher.name}</p>
      <p className="text-sm text-gray-500">Views: {course.views} | Likes: {course.likes.length}</p>
      <button
        onClick={() => navigate(`/course/${course._id}`)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Details
      </button>
      <button
        onClick={handleEnroll}
        className="mt-2 ml-2 bg-green-500 text-white px-4 py-2 rounded"
      >
        Enroll
      </button>
    </div>
  );
};

export default CourseCard;