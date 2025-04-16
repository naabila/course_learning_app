import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const CourseForm: React.FC = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');

  const handleSubmit = async () => {
    if (!currentUser) return;
    const token = await currentUser.getIdToken();
    try {
      await axios.post(
        'http://localhost:5000/api/v1/courses',
        { title, description, subject, level },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Course created successfully!');
      setTitle('');
      setDescription('');
      setSubject('');
      setLevel('');
    } catch (error) {
      alert('Error creating course');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Course</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Level</label>
        <input
          type="text"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Course
      </button>
    </div>
  );
};

export default CourseForm;