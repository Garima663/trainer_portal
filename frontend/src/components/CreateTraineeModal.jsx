// // src/components/CreateTraineeModal.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateTraineeModal = ({ isOpen, onClose, programId, onCreated }) => {
//   const [trainee, setTrainee] = useState({
//     name: '',
//     email: '',
//   });

//   const handleChange = (e) => {
//     setTrainee({ ...trainee, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:5000/api/trainer/trainees', {
//         ...trainee,
//         program_id: programId,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       onClose();
//       setTrainee({ name: '', email: '' });
//       onCreated(); // refresh trainee list
//     } catch (err) {
//       console.error('Error creating trainee:', err);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Create Trainee</h2>
//         <input
//           name="name"
//           placeholder="Trainee Name"
//           className="w-full border px-3 py-2 mb-3"
//           onChange={handleChange}
//           value={trainee.name}
//         />
//         <input
//           name="email"
//           placeholder="Email"
//           className="w-full border px-3 py-2 mb-3"
//           onChange={handleChange}
//           value={trainee.email}
//         />
//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
//           <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Create</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateTraineeModal;







import React, { useState } from 'react';
import axios from 'axios';

const CreateTraineeModal = ({ isOpen, onClose, programId, onCreated }) => {
  const [trainee, setTrainee] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setTrainee({ ...trainee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/trainer/trainees', {
        ...trainee,
        program_id: programId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onClose();
      setTrainee({ name: '', email: '' });
      onCreated(); // refresh trainee list
    } catch (err) {
      console.error('Error creating trainee:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Create Trainee</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Trainee Name"
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              onChange={handleChange}
              value={trainee.name}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Trainee Email"
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              onChange={handleChange}
              value={trainee.email}
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTraineeModal;

