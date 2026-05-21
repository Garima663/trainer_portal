import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTaskModal = ({ isOpen, onClose, task, projectId, onUpdated }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDeadline(task.deadline);
    }
  }, [task]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/trainer/projects/${projectId}/tasks/${task.id}`,
        { title, deadline },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdated();
      onClose();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[400px]">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
