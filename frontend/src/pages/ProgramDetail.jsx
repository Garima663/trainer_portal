// // src/pages/ProgramDetail.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import CreateTraineeModal from '../components/CreateTraineeModal';
// import CreateProjectModal from '../components/CreateProjectModal';
// import axios from 'axios';

// import toast from "react-hot-toast";

// const ProgramDetail = () => {
//   const { programId } = useParams();
//   const [program, setProgram] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [trainees, setTrainees] = useState([]);
//   const [traineeModalOpen, setTraineeModalOpen] = useState(false);
//   const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

//   const fetchProgramDetails = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:5000/api/trainer/programs/${programId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProgram(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Failed to fetch program details', err);
//     }
//   };

//   const fetchTrainees = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:5000/api/trainer/trainees/${programId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTrainees(res.data);
//     } catch (err) {
//       console.error('Failed to fetch trainees', err);
//     }
//   };

//   const [projects, setProjects] = useState([]);

//   const fetchProjects = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:5000/api/trainer/projects/${programId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(res.data);
//     } catch (err) {
//       console.error('Failed to fetch projects', err);
//     }
//   };










//   useEffect(() => {
//     fetchProgramDetails();
//     fetchTrainees();
//     fetchProjects();
//   }, []);

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Internship Program Details</h2>

//       {/* Program Info Table */}
//       <table className="min-w-full bg-white shadow border mb-6">
//         <tbody>
//           <tr><td className="py-2 px-4 border font-semibold">Title</td><td className="py-2 px-4 border">{program.title}</td></tr>
//           <tr><td className="py-2 px-4 border font-semibold">Start Date</td><td className="py-2 px-4 border">{program.start_date}</td></tr>
//           <tr><td className="py-2 px-4 border font-semibold">End Date</td><td className="py-2 px-4 border">{program.end_date}</td></tr>
//           <tr><td className="py-2 px-4 border font-semibold">Type</td><td className="py-2 px-4 border">{program.internship_type}</td></tr>
//           <tr><td className="py-2 px-4 border font-semibold">Status</td><td className="py-2 px-4 border">{program.status}</td></tr>
//           <tr><td className="py-2 px-4 border font-semibold">Trainer Name</td><td className="py-2 px-4 border">{program.trainer_name}</td></tr>
//         </tbody>
//       </table>

//       {/* Action Buttons */}
//       <div className="flex gap-4 mb-4">
//         <button onClick={() => setTraineeModalOpen(true)} className={`px-4 py-2 rounded ${program.status === "completed"
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-green-600 text-white"
//           }`}
//           disabled={program.status === "completed"}>
//           + Create Trainee
//         </button>
//         <button onClick={() => setIsProjectModalOpen(true)} className={`px-4 py-2 rounded ${program.status === "completed"
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-indigo-600 text-white"
//           }`}
//           disabled={program.status === "completed"}>
//           + Create Project
//         </button>
//       </div>

//       {/* Create Modals */}
//       <CreateTraineeModal
//         isOpen={traineeModalOpen}
//         onClose={() => setTraineeModalOpen(false)}
//         programId={programId}
//         onCreated={fetchTrainees}
//       />

//       <CreateProjectModal
//         isOpen={isProjectModalOpen}
//         onClose={() => setIsProjectModalOpen(false)}
//         programId={programId}
//         onCreated={fetchProjects} // ✅ important!
//       />





//       <table className="min-w-full border border-gray-300 rounded-lg">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 border">Name</th>
//             <th className="px-4 py-2 border">Email</th>
//             <th className="px-4 py-2 border">Upload Attendance</th>
//             <th className="px-4 py-2 border">View Attendance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {trainees.map((trainee) => (
//             <tr key={trainee.id} className="border-t">
//               <td className="px-4 py-2 border">{trainee.name}</td>
//               <td className="px-4 py-2 border">{trainee.email}</td>

//               {/* Upload Attendance */}
//               <td className="px-4 py-2 border">
//                 <form
//                   onSubmit={async (e) => {
//                     e.preventDefault();
//                     const formData = new FormData();
//                     formData.append("file", e.target.file.files[0]);
//                     formData.append("traineeId", trainee.id); // pass traineeId

//                     await fetch("http://localhost:5000/api/trainer/attendance/upload", {
//                       method: "POST",
//                       body: formData,
//                     });
//                     toast.success("Attendance uploaded successfully ✅");

//                     // refresh trainees after upload
//                     fetchTrainees();


                    
    
//                   }}
//                 >
//                   <input
//                     type="file"
//                     name="file"
//                     accept=".xlsx,.xls"
//                     className="mb-2"
//                     required
//                   />
//                   <button
//                     type="submit"
//                     className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     Upload
//                   </button>
//                 </form>
//               </td>

//               {/* View Attendance */}
//               <td className="px-4 py-2 border">
//                 {trainee.attendance_file ? (
//                   <a
//                     href={`http://localhost:5000${trainee.attendance_file}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-500 underline"
//                   >
//                     View Attendance
//                   </a>
//                 ) : (
//                   <span className="text-gray-400">No file</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>





//       <h3 className="text-xl font-semibold mt-6 mb-2">Projects under this Program</h3>
//       <table className="min-w-full bg-white shadow border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-2 px-4 border">Title</th>
//             <th className="py-2 px-4 border">Description</th>
//             <th className="py-2 px-4 border">Status</th>
//             <th className="py-2 px-4 border">Actions</th>
//             <th className="border px-4 py-2">Project Report</th>
//             <th className="border px-4 py-2">View Project Report</th>

//           </tr>
//         </thead>
//         <tbody>
//           {projects.map((p) => (
//             <tr key={p.id}>
//               <td className="py-2 px-4 border">{p.title}</td>
//               <td className="py-2 px-4 border">{p.description}</td>
//               <td className="py-2 px-4 border">{p.status}</td>
//               <td className="py-2 px-4 border">
//                 <button
//                   className="bg-blue-500 text-white px-3 py-1 rounded"
//                   onClick={() => window.location.href = `/trainer/projects/${p.id}`}
//                 >
//                   View
//                 </button>
//               </td>
//               <td className="border px-4 py-2">
//   <form
//     onSubmit={async (e) => {
//       e.preventDefault();
//       const formData = new FormData();
//       formData.append("file", e.target.file.files[0]);
//       formData.append("projectId", p.id);

//       const res = await fetch("http://localhost:5000/api/trainer/projects/report/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (res.ok) {
//         toast.success("Project report uploaded!");
//         fetchProjects(); // refresh list to show link
//       } else {
//         toast.error("Failed to upload project report");
//       }
//     }}
//   >
    
    
//     <input type="file" name="file" accept=".pdf,.doc,.docx" />
//     <button type="submit" className="ml-2 bg-green-500 text-white px-3 py-1 rounded">
//       Upload
//     </button>
//   </form>
//   </td>
//   <td>

//   {p.project_report_file ? (
//     <a
//       href={`http://localhost:5000${p.project_report_file}`}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="text-blue-500 underline ml-2"
//     >
//       View Report
//     </a>
//   ) : (
//     <span className="text-gray-400 ml-2">No file</span>
//   )}
// </td>

//             </tr>
//           ))}
//           {projects.length === 0 && (
//             <tr>
//               <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
//                 No projects found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>


//     </div>
//   );
// };

// export default ProgramDetail;









// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import CreateTraineeModal from '../components/CreateTraineeModal';
// import CreateProjectModal from '../components/CreateProjectModal';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const ProgramDetail = () => {
//   const { programId } = useParams();
//   const [program, setProgram] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [trainees, setTrainees] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [traineeModalOpen, setTraineeModalOpen] = useState(false);
//   const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

//   const fetchProgramDetails = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:5000/api/trainer/programs/${programId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProgram(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Failed to fetch program details', err);
//     }
//   };

//   const fetchTrainees = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:5000/api/trainer/trainees/${programId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTrainees(res.data);
//     } catch (err) {
//       console.error('Failed to fetch trainees', err);
//     }
//   };

//   const fetchProjects = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:5000/api/trainer/projects/${programId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(res.data);
//     } catch (err) {
//       console.error('Failed to fetch projects', err);
//     }
//   };

//   useEffect(() => {
//     fetchProgramDetails();
//     fetchTrainees();
//     fetchProjects();
//   }, []);

//   if (loading) return <div className="p-4 text-white">Loading...</div>;

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <h2 className="text-3xl font-bold mb-6">Internship Program Details</h2>

//       <table className="w-full bg-gray-800 rounded-lg overflow-hidden shadow mb-8">
//         <tbody>
//           {[
//             ['Title', program.title],
//             ['Start Date', program.start_date],
//             ['End Date', program.end_date],
//             ['Type', program.internship_type],
//             ['Status', program.status],
//             ['Trainer Name', program.trainer_name],
//           ].map(([label, value]) => (
//             <tr key={label} className="border-b border-gray-700">
//               <td className="p-3 font-semibold text-gray-300 w-1/3">{label}</td>
//               <td className="p-3">{value}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => setTraineeModalOpen(true)}
//           className={`px-4 py-2 rounded transition ${
//             program.status === 'completed'
//               ? 'bg-gray-600 cursor-not-allowed'
//               : 'bg-green-600 hover:bg-green-700'
//           }`}
//           disabled={program.status === 'completed'}
//         >
//           + Create Trainee
//         </button>
//         <button
//           onClick={() => setIsProjectModalOpen(true)}
//           className={`px-4 py-2 rounded transition ${
//             program.status === 'completed'
//               ? 'bg-gray-600 cursor-not-allowed'
//               : 'bg-indigo-600 hover:bg-indigo-700'
//           }`}
//           disabled={program.status === 'completed'}
//         >
//           + Create Project
//         </button>
//       </div>

//       <CreateTraineeModal
//         isOpen={traineeModalOpen}
//         onClose={() => setTraineeModalOpen(false)}
//         programId={programId}
//         onCreated={fetchTrainees}
//       />

//       <CreateProjectModal
//         isOpen={isProjectModalOpen}
//         onClose={() => setIsProjectModalOpen(false)}
//         programId={programId}
//         onCreated={fetchProjects}
//       />

//       <h3 className="text-2xl font-semibold mb-2">Trainees</h3>
//       <table className="w-full mb-10 bg-gray-800 rounded-lg shadow">
//         <thead className="bg-gray-700 text-gray-300">
//           <tr>
//             <th className="p-3 text-left">Name</th>
//             <th className="p-3 text-left">Email</th>
//             <th className="p-3 text-left">Upload Attendance</th>
//             <th className="p-3 text-left">View Attendance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {trainees.map((trainee) => (
//             <tr key={trainee.id} className="border-t border-gray-700">
//               <td className="p-3">{trainee.name}</td>
//               <td className="p-3">{trainee.email}</td>
//               <td className="p-3">
//                 <form
//                   onSubmit={async (e) => {
//                     e.preventDefault();
//                     const formData = new FormData();
//                     formData.append('file', e.target.file.files[0]);
//                     formData.append('traineeId', trainee.id);
//                     await fetch('http://localhost:5000/api/trainer/attendance/upload', {
//                       method: 'POST',
//                       body: formData,
//                     });
//                     toast.success('Attendance uploaded ✅');
//                     fetchTrainees();
//                   }}
//                 >
//                   <input type="file" name="file" accept=".xlsx,.xls" required className="text-white" />
//                   <button type="submit" className="ml-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white">
//                     Upload
//                   </button>
//                 </form>
//               </td>
//               <td className="p-3">
//                 {trainee.attendance_file ? (
//                   <a
//                     href={`http://localhost:5000${trainee.attendance_file}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-400 underline"
//                   >
//                     View Attendance
//                   </a>
//                 ) : (
//                   <span className="text-gray-400">No file</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h3 className="text-2xl font-semibold mb-2">Projects</h3>
//       <table className="w-full bg-gray-800 rounded-lg shadow">
//         <thead className="bg-gray-700 text-gray-300">
//           <tr>
//             <th className="p-3">Title</th>
//             <th className="p-3">Description</th>
//             <th className="p-3">Status</th>
//             <th className="p-3">Actions</th>
//             <th className="p-3">Project Report</th>
//             <th className="p-3">View Report</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projects.map((p) => (
//             <tr key={p.id} className="border-t border-gray-700">
//               <td className="p-3">{p.title}</td>
//               <td className="p-3">{p.description}</td>
//               <td className="p-3">{p.status}</td>
//               <td className="p-3">
//                 <button
//                   className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
//                   onClick={() => window.location.href = `/trainer/projects/${p.id}`}
//                 >
//                   View
//                 </button>
//               </td>
//               <td className="p-3">
//                 <form
//                   onSubmit={async (e) => {
//                     e.preventDefault();
//                     const formData = new FormData();
//                     formData.append('file', e.target.file.files[0]);
//                     formData.append('projectId', p.id);
//                     const res = await fetch('http://localhost:5000/api/trainer/projects/report/upload', {
//                       method: 'POST',
//                       body: formData,
//                     });
//                     if (res.ok) {
//                       toast.success('Project report uploaded!');
//                       fetchProjects();
//                     } else {
//                       toast.error('Failed to upload project report');
//                     }
//                   }}
//                 >
//                   <input type="file" name="file" accept=".pdf,.doc,.docx" className="text-white" />
//                   <button type="submit" className="ml-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
//                     Upload
//                   </button>
//                 </form>
//               </td>
//               <td className="p-3">
//                 {p.project_report_file ? (
//                   <a
//                     href={`http://localhost:5000${p.project_report_file}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-400 underline"
//                   >
//                     View Report
//                   </a>
//                 ) : (
//                   <span className="text-gray-400">No file</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//           {projects.length === 0 && (
//             <tr>
//               <td colSpan="6" className="text-center py-4 text-gray-400">
//                 No projects found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProgramDetail;







import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateTraineeModal from '../components/CreateTraineeModal';
import CreateProjectModal from '../components/CreateProjectModal';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProgramDetail = () => {
  const { programId } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trainees, setTrainees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [traineeModalOpen, setTraineeModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const fetchProgramDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/trainer/programs/${programId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProgram(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch program details', err);
    }
  };

  const fetchTrainees = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/trainer/trainees/${programId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrainees(res.data);
    } catch (err) {
      console.error('Failed to fetch trainees', err);
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/trainer/projects/${programId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    }
  };

  useEffect(() => {
    fetchProgramDetails();
    fetchTrainees();
    fetchProjects();
  }, []);

  if (loading) return <div className="p-4 text-white">Loading...</div>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6">Internship Program Details</h2>

      {/* Program Details Table */}
      <div className="overflow-hidden rounded-lg shadow mb-8 border border-gray-700">
        <table className="w-full text-sm">
          <tbody>
            {[
              ['Title', program.title],
              ['Start Date', program.start_date],
              ['End Date', program.end_date],
              ['Type', program.internship_type],
              ['Status', program.status],
              ['Trainer Name', program.trainer_name],
            ].map(([label, value], idx) => (
              <tr
                key={label}
                className={`${
                  idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                } hover:bg-gray-600 transition`}
              >
                <td className="p-3 font-semibold text-gray-300 w-1/3">{label}</td>
                <td className="p-3">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTraineeModalOpen(true)}
          className={`px-4 py-2 rounded-lg transition font-medium ${
            program.status === 'completed'
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
          disabled={program.status === 'completed'}
        >
          + Create Trainee
        </button>
        <button
          onClick={() => setIsProjectModalOpen(true)}
          className={`px-4 py-2 rounded-lg transition font-medium ${
            program.status === 'completed'
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
          disabled={program.status === 'completed'}
        >
          + Create Project
        </button>
      </div>

      <CreateTraineeModal
        isOpen={traineeModalOpen}
        onClose={() => setTraineeModalOpen(false)}
        programId={programId}
        onCreated={fetchTrainees}
      />

      <CreateProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        programId={programId}
        onCreated={fetchProjects}
      />

      {/* Trainees Table */}
      <h3 className="text-2xl font-semibold mb-3">Trainees</h3>
      <div className="overflow-hidden rounded-lg shadow mb-10 border border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-700 text-gray-300 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Upload Attendance</th>
              <th className="p-3">View Attendance</th>
            </tr>
          </thead>
          <tbody>
            {trainees.map((trainee, idx) => (
              <tr
                key={trainee.id}
                className={`${
                  idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                } hover:bg-gray-600 transition`}
              >
                <td className="p-3">{trainee.name}</td>
                <td className="p-3">{trainee.email}</td>
                <td className="p-3">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData();
                      formData.append('file', e.target.file.files[0]);
                      formData.append('traineeId', trainee.id);
                      await fetch('http://localhost:5000/api/trainer/attendance/upload', {
                        method: 'POST',
                        body: formData,
                      });
                      toast.success('Attendance uploaded ✅');
                      fetchTrainees();
                    }}
                  >
                    <input type="file" name="file" accept=".xlsx,.xls" required className="text-sm text-gray-300" />
                    <button type="submit" className="ml-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm">
                      Upload
                    </button>
                  </form>
                </td>
                <td className="p-3">
                  {trainee.attendance_file ? (
                    <a
                      href={`http://localhost:5000${trainee.attendance_file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      View Attendance
                    </a>
                  ) : (
                    <span className="text-gray-400">No file</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Projects Table */}
      <h3 className="text-2xl font-semibold mb-3">Projects</h3>
      <div className="overflow-hidden rounded-lg shadow border border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-700 text-gray-300 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
              <th className="p-3">Project Report</th>
              <th className="p-3">View Report</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, idx) => (
              <tr
                key={p.id}
                className={`${
                  idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                } hover:bg-gray-600 transition`}
              >
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.description}</td>
                <td className="p-3">{p.status}</td>
                <td className="p-3">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
                    onClick={() => (window.location.href = `/trainer/projects/${p.id}`)}
                  >
                    View
                  </button>
                </td>
                <td className="p-3">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData();
                      formData.append('file', e.target.file.files[0]);
                      formData.append('projectId', p.id);
                      const res = await fetch('http://localhost:5000/api/trainer/projects/report/upload', {
                        method: 'POST',
                        body: formData,
                      });
                      if (res.ok) {
                        toast.success('Project report uploaded!');
                        fetchProjects();
                      } else {
                        toast.error('Failed to upload project report');
                      }
                    }}
                  >
                    <input type="file" name="file" accept=".pdf,.doc,.docx" className="text-sm text-gray-300" />
                    <button type="submit" className="ml-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                      Upload
                    </button>
                  </form>
                </td>
                <td className="p-3">
                  {p.project_report_file ? (
                    <a
                      href={`http://localhost:5000${p.project_report_file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      View Report
                    </a>
                  ) : (
                    <span className="text-gray-400">No file</span>
                  )}
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramDetail;

