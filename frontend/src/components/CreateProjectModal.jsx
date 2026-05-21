







// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateProjectModal = ({ isOpen, onClose, programId, onCreated }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//         'http://localhost:5000/api/trainer/projects',
//         {
//           title,
//           description,
//           programId,
//           status: "Active"
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       onCreated(); // refresh project list
//       onClose();   // close modal
//     } catch (err) {
//       console.error('Error creating project:', err);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Create Project</h2>
//         <form onSubmit={handleSubmit}>
//           <label className="block mb-2">
//             Title:
//             <input
//               className="w-full border p-2 rounded"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </label>
//           <label className="block mb-4">
//             Description:
//             <textarea
//               className="w-full border p-2 rounded"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
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

// export default CreateProjectModal;






import React, { useState } from 'react';
import axios from 'axios';

const CreateProjectModal = ({ isOpen, onClose, programId, onCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/trainer/projects',
        {
          title,
          description,
          programId,
          status: "Active",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onCreated();  // refresh list
      onClose();    // close modal
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Create Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Project title"
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Project description"
              className="w-full px-3 py-2 h-24 resize-none rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;

