import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Individual', // default selection
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/trainer/projects',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('Project assigned successfully!');
      setFormData({ title: '', description: '', type: 'Individual' });
    } catch (error) {
      console.error('Error assigning project:', error);
      setMessage('Error assigning project');
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      {/* <h2 className="text-lg font-semibold mbp-4">Assign Project</h2> */}
      <form onSubmit={handleSubmit} className="sace-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          >
            <option value="Individual">Individual</option>
            <option value="Group">Group</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Create Project
        </button>
        {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default ProjectForm;
