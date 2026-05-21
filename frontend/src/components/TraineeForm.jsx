// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TraineeForm = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', trainer_id: '' });
//   const [trainers, setTrainers] = useState([]);
//   const [message, setMessage] = useState('');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/admin/trainers', {
//       headers: { Authorization: `Bearer ${token}` },
//     }).then(res => setTrainers(res.data));
//   }, []);

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/admin/trainees', formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage('Trainee added!');
//       setFormData({ name: '', email: '', trainer_id: '' });
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Error adding trainee');
//     }
//   };

//   return (
//     <div>
//       <h3 className="font-bold mb-2">Add Trainee</h3>
//       {message && <p className="text-green-600">{message}</p>}
//       <form onSubmit={handleSubmit} className="space-y-2">
//         <input name="name" placeholder="Name" className="border p-2 w-full" value={formData.name} onChange={handleChange} />
//         <input name="email" placeholder="Email" className="border p-2 w-full" value={formData.email} onChange={handleChange} />
//         <select name="trainer_id" className="border p-2 w-full" value={formData.trainer_id} onChange={handleChange}>
//           <option value="" disabled selected hidden>Select Trainer</option>
//           {trainers.map(t => (
//             <option key={t.id} value={t.id}>{t.name}</option>
//           ))}
//         </select>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Trainee</button>
//       </form>
//     </div>
//   );
// };

// export default TraineeForm;


import React, { useState } from 'react';
import axios from 'axios';

const TraineeForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/trainer/trainees', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Trainee added successfully!');
      setFormData({ name: '', email: '' });
      onAdd();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding trainee');
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Add Trainee</h2>
      {message && <p className="text-sm text-green-600 mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          className="border p-2 w-full"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Trainee
        </button>
      </form>
    </div>
  );
};

export default TraineeForm;
