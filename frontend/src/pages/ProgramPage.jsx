// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProgramSection = () => {
//   const [formData, setFormData] = useState({ type: '', description: '', duration: '' });
//   const [programs, setPrograms] = useState([]);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/admin/programs', {
//       headers: { Authorization: `Bearer ${token}` }
//     }).then(res => setPrograms(res.data));
//   }, []);

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     await axios.post('http://localhost:5000/api/admin/programs', formData, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setFormData({ type: '', description: '', duration: '' });
//     const res = await axios.get('http://localhost:5000/api/admin/programs', {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setPrograms(res.data);
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Create Program</h2>
//       <form onSubmit={handleSubmit} className="space-y-2 mb-6">
//         <input name="type" placeholder="Internship Type" className="border p-2 w-full" value={formData.type} onChange={handleChange} />
//         <textarea name="description" placeholder="Description" className="border p-2 w-full" value={formData.description} onChange={handleChange} />
//         <input name="duration" placeholder="Duration (e.g., 6 weeks)" className="border p-2 w-full" value={formData.duration} onChange={handleChange} />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
//       </form>

//       <h3 className="text-lg font-bold mb-2">Program List</h3>
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Type</th>
//             <th className="border p-2">Description</th>
//             <th className="border p-2">Duration</th>
//           </tr>
//         </thead>
//         <tbody>
//           {programs.map((program, index) => (
//             <tr key={index}>
//               <td className="border p-2">{program.type}</td>
//               <td className="border p-2">{program.description}</td>
//               <td className="border p-2">{program.duration}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProgramSection;





import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgramSection = () => {
  const [formData, setFormData] = useState({ type: '', description: '', duration: '' });
  const [programs, setPrograms] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/programs', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPrograms(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/admin/programs', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFormData({ type: '', description: '', duration: '' });
    fetchPrograms();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Program</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex items-center">
          <label htmlFor="type" className="w-40 text-gray-300 font-medium">Internship Type:</label>
          <input
            id="type"
            name="type"
            type="text"
            placeholder="e.g., Web Development"
            className="flex-1 px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-start">
          <label htmlFor="description" className="w-40 text-gray-300 font-medium pt-2">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Write a brief description..."
            className="flex-1 px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm h-24 resize-none"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="duration" className="w-40 text-gray-300 font-medium">Duration:</label>
          <input
            id="duration"
            name="duration"
            type="text"
            placeholder="e.g., 6 weeks"
            className="flex-1 px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition"
          >
            Create
          </button>
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-4">Program List</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-700 text-gray-300 text-left text-sm uppercase">
              <th className="px-4 py-2 border-b border-gray-600">Type</th>
              <th className="px-4 py-2 border-b border-gray-600">Description</th>
              <th className="px-4 py-2 border-b border-gray-600">Duration</th>
            </tr>
          </thead>
          <tbody>
            {programs.length > 0 ? (
              programs.map((program, index) => (
                <tr key={index} className="hover:bg-gray-700 transition">
                  <td className="px-4 py-2 border-b border-gray-700">{program.type}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{program.description}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{program.duration}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-4 text-center text-gray-400">
                  No programs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramSection;
