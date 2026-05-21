// // src/components/CreateTaskModal.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateTaskModal = ({ isOpen, onClose, projectId, onCreated }) => {
//   const [title, setTitle] = useState('');
//   const [deadline, setDeadline] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//          `http://localhost:5000/api/trainer/projects/${projectId}/tasks`,
//         { title, deadline, projectId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       onCreated();
//       onClose();
//     } catch (err) {
//       console.error('Error creating task:', err);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Create Task</h2>
//         <form onSubmit={handleSubmit}>
//           <label className="block mb-2">
//             Task Title:
//             <input
//               className="w-full border p-2 rounded"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </label>
//           <label className="block mb-4">
//             Deadline:
//             <input
//               type="date"
//               className="w-full border p-2 rounded"
//               value={deadline}
//               onChange={(e) => setDeadline(e.target.value)}
//               required
//             />
//           </label>
//           <div className="flex justify-end gap-2">
//             <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
//               Cancel
//             </button>
//             <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
//               Create
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTaskModal;



// src/components/CreateTaskModal.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateTaskModal = ({ isOpen, onClose, projectId, onCreated }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/trainer/projects/${projectId}/tasks`,
        { title, deadline, projectId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onCreated();
      onClose();
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md text-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-white">Create Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-300">Task Title:</span>
            <input
              className="w-full mt-1 border border-gray-700 bg-gray-800 text-gray-100 p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-300">Deadline:</span>
            <input
              type="date"
              className="w-full mt-1 border border-gray-700 bg-gray-800 text-gray-100 p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </label>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;

