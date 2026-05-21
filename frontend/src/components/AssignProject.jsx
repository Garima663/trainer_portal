// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AssignProject = () => {
//   const [projects, setProjects] = useState([]);
//   const [trainees, setTrainees] = useState([]);
//   const [projectId, setProjectId] = useState('');
//   const [traineeId, setTraineeId] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem('token');
//       const headers = { Authorization: `Bearer ${token}` };

//       const [projectRes, traineeRes] = await Promise.all([
//         axios.get('http://localhost:5000/api/trainer/projects', { headers }),
//         axios.get('http://localhost:5000/api/trainer/trainees', { headers }),
//       ]);

//       setProjects(projectRes.data);
//       setTrainees(traineeRes.data);
//     };

//     fetchData();
//   }, []);

//   const handleAssign = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.post(
//         'http://localhost:5000/api/trainer/assign-project',
//         { projectId, traineeId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert('Project assigned successfully!');
//     } catch (error) {
//       console.error('Assignment failed:', error);
//       alert('Failed to assign project.');
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow-md max-w-md">
//       <h2 className="text-lg font-semibold mb-4">Assign Project to Trainee</h2>

//       <select
//         value={projectId}
//         onChange={(e) => setProjectId(e.target.value)}
//         className="w-full mb-4 p-2 border rounded"
//       >
//         <option value="">Select Project</option>
//         {projects.map((p) => (
//           <option key={p.id} value={p.id}>
//             {p.title}
//           </option>
//         ))}
//       </select>

//       <select
//         value={traineeId}
//         onChange={(e) => setTraineeId(e.target.value)}
//         className="w-full mb-4 p-2 border rounded"
//       >
//         <option value="">Select Trainee</option>
//         {trainees.map((t) => (
//           <option key={t.id} value={t.id}>
//             {t.name}
//           </option>
//         ))}
//       </select>

//       <button
//         onClick={handleAssign}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Assign
//       </button>
//     </div>
//   );
// };

// export default AssignProject;
