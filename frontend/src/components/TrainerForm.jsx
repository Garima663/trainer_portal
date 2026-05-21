// import React, { useState } from 'react';
// import axios from 'axios';

// const TrainerForm = ({ onAdd }) => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [message, setMessage] = useState('');

//   const token = localStorage.getItem('token');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post('http://localhost:5000/api/admin/trainers', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setMessage('Trainer added successfully!');
//       setFormData({ name: '', email: '', password: '' });
//       onAdd();
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Error adding trainer');
//     }
//   };

//   return (
//     <div className="mb-6">
//       <h2 className="text-xl font-semibold mb-2">Add Trainer</h2>
//       {message && <p className="text-sm text-green-600 mb-2">{message}</p>}
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           name="name"
//           placeholder="Name"
//           className="border p-2 w-full"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <input
//           name="email"
//           placeholder="Email"
//           className="border p-2 w-full"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           className="border p-2 w-full"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Add Trainer
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TrainerForm;




import React, { useState } from 'react';
import axios from 'axios';

const TrainerForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/admin/trainers', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('✅ Trainer added successfully!');
      setFormData({ name: '', email: '', password: '' });
      onAdd();
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Error adding trainer');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-white mb-7">
      <h2 className="text-2xl font-semibold mb-4">Add Trainer</h2>

      {message && (
        <p className="text-green-400 text-sm mb-4">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="flex items-center">
          <label htmlFor="name" className="w-32 font-medium text-gray-300">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name"
            className="flex-1 px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center">
          <label htmlFor="email" className="w-32 font-medium text-gray-300">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            className="flex-1 px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center">
          <label htmlFor="password" className="w-32 font-medium text-gray-300">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            className="flex-1 px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition-colors"
          >
            Add Trainer
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrainerForm;



