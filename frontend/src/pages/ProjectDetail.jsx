



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Pencil, Trash2 } from 'lucide-react';

// import CreateTaskModal from '../components/CreateTaskModal';
// import EditTaskModal from '../components/EditTaskModal';

// const ProjectDetail = () => {
//   const { projectId } = useParams();
//   const [project, setProject] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [taskToEdit, setTaskToEdit] = useState(null);

//   // Fetch project details
//   const fetchProjectDetails = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:5000/api/trainer/project/${projectId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProject(res.data);
//     } catch (err) {
//       console.error('Error fetching project:', err);
//     }
//   };

//   // Fetch tasks
//   const fetchTasks = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:5000/api/trainer/projects/${projectId}/tasks`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);
//     } catch (err) {
//       console.error('Error fetching tasks:', err);
//     }
//   };

//   // Delete task
//   const handleDeleteTask = async (taskId) => {
//     if (!window.confirm('Are you sure you want to delete this task?')) return;

//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(
//         `http://localhost:5000/api/trainer/projects/${projectId}/tasks/${taskId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchTasks();
//     } catch (err) {
//       console.error('Error deleting task:', err);
//     }
//   };

//   // Mark task as completed
//   const markCompleted = async (taskId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:5000/api/trainer/projects/${projectId}/tasks/${taskId}/complete`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchTasks();
//     } catch (err) {
//       console.error('Error marking task completed:', err);
//     }
//   };

//   // Mark project as completed
//   const markProjectCompleted = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:5000/api/trainer/project/${projectId}/status`,
//         { status: 'completed' },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchProjectDetails(); // refresh status
//     } catch (err) {
//       console.error('Error updating project status:', err);
//     }
//   };

//   useEffect(() => {
//     fetchProjectDetails();
//     fetchTasks();
//     setLoading(false);
//   }, []);

//   const actionButtonClasses =
//     'flex items-center gap-1 text-sm px-2 py-1 border rounded transition';

//   if (loading || !project) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Project Details</h2>

//       <table className="min-w-full bg-white shadow border mb-6">
//         <tbody>
//           <tr>
//             <td className="py-2 px-4 border font-semibold">Title</td>
//             <td className="py-2 px-4 border">{project.title}</td>
//           </tr>
//           <tr>
//             <td className="py-2 px-4 border font-semibold">Description</td>
//             <td className="py-2 px-4 border">{project.description}</td>
//           </tr>
//           <tr>
//             <td className="py-2 px-4 border font-semibold">Status</td>
//             <td className="py-2 px-4 border">
//               {project.status === 'completed' ? (
//                 <span className="text-green-600 font-medium">✅ Completed</span>
//               ) : (
//                 <span className="text-yellow-600 font-medium">Active</span>
//               )}
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       <div className="flex gap-3 mb-4">
//         <button
//           onClick={() => setIsTaskModalOpen(true)}
//           disabled={project.status === 'completed'}
//           className={`px-4 py-2 rounded text-white ${
//             project.status === 'completed'
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           + Task
//         </button>

//         {project.status !== 'completed' && (
//           <button
//             onClick={markProjectCompleted}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//           >
//             Mark as Completed
//           </button>
//         )}
//       </div>

//       <CreateTaskModal
//         isOpen={isTaskModalOpen}
//         onClose={() => setIsTaskModalOpen(false)}
//         projectId={projectId}
//         onCreated={fetchTasks}
//       />

//       <h3 className="text-xl font-semibold mt-4 mb-2">Tasks under this Project</h3>
//       <table className="min-w-full bg-white shadow border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-2 px-4 border">Task</th>
//             <th className="py-2 px-4 border">Deadline</th>
//             <th className="py-2 px-4 border">Status</th>
//             <th className="py-2 px-4 border text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task) => (
//             <tr key={task.id}>
//               <td className="py-2 px-4 border">{task.title}</td>
//               <td className="py-2 px-4 border">{task.deadline}</td>
//               <td className="py-2 px-4 border">
//                 {task.status === 'completed' ? (
//                   <span className="text-green-600 font-medium">✅ Completed</span>
//                 ) : (
//                   <span className="text-yellow-600 font-medium">Pending</span>
//                 )}
//               </td>
//               <td className="py-2 px-4 border">
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => {
//                       setTaskToEdit(task);
//                       setIsEditModalOpen(true);
//                     }}
//                     className={`${actionButtonClasses} text-blue-600 border-blue-500 hover:bg-blue-50`}
//                   >
//                     <Pencil size={14} />
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDeleteTask(task.id)}
//                     className="flex items-center gap-1 text-sm text-red-600 px-2 py-1 border border-red-500 rounded hover:bg-red-50"
//                   >
//                     <Trash2 size={14} />
//                     Delete
//                   </button>

//                   {task.status !== 'completed' && (
//                     <button
//                       onClick={() => markCompleted(task.id)}
//                       className="text-sm text-green-700 border border-green-600 px-2 py-1 rounded"
//                     >
//                       Mark Completed
//                     </button>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//           {tasks.length === 0 && (
//             <tr>
//               <td colSpan="4" className="text-center py-4 text-gray-500">
//                 No tasks found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <EditTaskModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         task={taskToEdit}
//         projectId={projectId}
//         onUpdated={fetchTasks}
//       />
//     </div>
//   );
// };

// export default ProjectDetail;























































// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Pencil, Trash2 } from 'lucide-react';

// import CreateTaskModal from '../components/CreateTaskModal';
// import EditTaskModal from '../components/EditTaskModal';

// const ProjectDetail = () => {
//   const { projectId } = useParams();
//   const [project, setProject] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [taskToEdit, setTaskToEdit] = useState(null);
//   const [isClosing, setIsClosing] = useState(false);

//   // Fetch project details
//   const fetchProjectDetails = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:5000/api/trainer/project/${projectId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProject(res.data);
//     } catch (err) {
//       console.error('Error fetching project:', err);
//     }
//   };

//   // Fetch tasks
//   const fetchTasks = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:5000/api/trainer/projects/${projectId}/tasks`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);
//     } catch (err) {
//       console.error('Error fetching tasks:', err);
//     }
//   };

//   // Delete task
//   const handleDeleteTask = async (taskId) => {
//     if (!window.confirm('Are you sure you want to delete this task?')) return;

//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(
//         `http://localhost:5000/api/trainer/projects/${projectId}/tasks/${taskId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchTasks();
//     } catch (err) {
//       console.error('Error deleting task:', err);
//     }
//   };

//   // Mark task as completed
//   const markCompleted = async (taskId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:5000/api/trainer/projects/${projectId}/tasks/${taskId}/complete`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchTasks();
//     } catch (err) {
//       console.error('Error marking task completed:', err);
//     }
//   };

//   // Close All Tasks -> only when no pendings; then mark project completed
//   const handleCloseAllTasks = async () => {
//     const pending = tasks.filter(
//       t => String(t.status || '').toLowerCase() !== 'completed'
//     );
//     if (pending.length > 0) {
//       alert('Some tasks are still pending. Please complete them first.');
//       return;
//     }

//     if (!window.confirm('Close all tasks and mark project as completed?')) return;

//     setIsClosing(true);
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:5000/api/trainer/project/${projectId}/status`,
//         { status: 'completed' },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Update UI immediately; persists across refresh because status is saved server-side
//       setProject(prev => (prev ? { ...prev, status: 'completed' } : prev));
//       setIsTaskModalOpen(false);
//     } catch (err) {
//       console.error('Error closing tasks / completing project:', err);
//       alert('Failed to close tasks');
//     } finally {
//       setIsClosing(false);
//     }
//   };

//   useEffect(() => {
//     const load = async () => {
//       try {
//         await Promise.all([fetchProjectDetails(), fetchTasks()]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [projectId]);

//   const actionButtonClasses =
//     'flex items-center gap-1 text-sm px-2 py-1 border rounded transition';

//   if (loading || !project) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Project Details</h2>

//       <table className="min-w-full bg-white shadow border mb-6">
//         <tbody>
//           <tr>
//             <td className="py-2 px-4 border font-semibold">Title</td>
//             <td className="py-2 px-4 border">{project.title}</td>
//           </tr>
//           <tr>
//             <td className="py-2 px-4 border font-semibold">Description</td>
//             <td className="py-2 px-4 border">{project.description}</td>
//           </tr>
//           <tr>
//             <td className="py-2 px-4 border font-semibold">Status</td>
//             <td className="py-2 px-4 border">
//               {project.status === 'completed' ? (
//                 <span className="text-green-600 font-medium">✅ Completed</span>
//               ) : (
//                 <span className="text-yellow-600 font-medium">Active</span>
//               )}
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       <div className="flex gap-3 mb-4">
//         <button
//           onClick={() => setIsTaskModalOpen(true)}
//           disabled={project.status === 'completed'}
//           className={`px-4 py-2 rounded text-white ${
//             project.status === 'completed'
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           + Task
//         </button>
//         {/* Removed the old red "Mark as Completed" button */}
//       </div>

//       <CreateTaskModal
//         isOpen={isTaskModalOpen}
//         onClose={() => setIsTaskModalOpen(false)}
//         projectId={projectId}
//         onCreated={fetchTasks}
//       />

//       <h3 className="text-xl font-semibold mt-4 mb-2">Tasks under this Project</h3>
//       <table className="min-w-full bg-white shadow border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-2 px-4 border">Task</th>
//             <th className="py-2 px-4 border">Deadline</th>
//             <th className="py-2 px-4 border">Status</th>
//             <th className="py-2 px-4 border text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task) => (
//             <tr key={task.id}>
//               <td className="py-2 px-4 border">{task.title}</td>
//               <td className="py-2 px-4 border">{task.deadline}</td>
//               <td className="py-2 px-4 border">
//                 {String(task.status).toLowerCase() === 'completed' ? (
//                   <span className="text-green-600 font-medium">✅ Completed</span>
//                 ) : (
//                   <span className="text-yellow-600 font-medium">Pending</span>
//                 )}
//               </td>
//               <td className="py-2 px-4 border">
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => {
//                       setTaskToEdit(task);
//                       setIsEditModalOpen(true);
//                     }}
//                     className={`${actionButtonClasses} text-blue-600 border-blue-500 hover:bg-blue-50`}
//                     disabled={project.status === 'completed'}
//                   >
//                     <Pencil size={14} />
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDeleteTask(task.id)}
//                     className="flex items-center gap-1 text-sm text-red-600 px-2 py-1 border border-red-500 rounded hover:bg-red-50"
//                     disabled={project.status === 'completed'}
//                   >
//                     <Trash2 size={14} />
//                     Delete
//                   </button>

//                   {String(task.status).toLowerCase() !== 'completed' && project.status !== 'completed' && (
//                     <button
//                       onClick={() => markCompleted(task.id)}
//                       className="text-sm text-green-700 border border-green-600 px-2 py-1 rounded"
//                     >
//                       Mark Completed
//                     </button>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//           {tasks.length === 0 && (
//             <tr>
//               <td colSpan="4" className="text-center py-4 text-gray-500">
//                 No tasks found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Close All Tasks Button */}
//       <div className="mt-4">
//         <button
//           onClick={handleCloseAllTasks}
//           className={`px-4 py-2 rounded text-white ${
//             project.status === 'completed'
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-green-600 hover:bg-green-700'
//           }`}
//           disabled={project.status === 'completed' || isClosing}
//         >
//           {project.status === 'completed' ? 'Closed' : isClosing ? 'Closing...' : 'Close All Tasks'}
//         </button>
//       </div>

//       <EditTaskModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         task={taskToEdit}
//         projectId={projectId}
//         onUpdated={fetchTasks}
//       />
//     </div>
//   );
// };

// export default ProjectDetail;





































// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Pencil, Trash2 } from 'lucide-react';
// import CreateTaskModal from '../components/CreateTaskModal';
// import EditTaskModal from '../components/EditTaskModal';

// const ProjectDetail = () => {
//   const { projectId } = useParams();
//   const [project, setProject] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [taskToEdit, setTaskToEdit] = useState(null);
//   const [isClosing, setIsClosing] = useState(false);

//   // Fetch project details
//   const fetchProjectDetails = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:5000/api/trainer/project/${projectId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProject(res.data);
//       console.log("Fetched project data:", res.data);

//     } catch (err) {
//       console.error('Error fetching project:', err);
//     }
//   };

//   // Fetch tasks
//   const fetchTasks = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:5000/api/trainer/projects/${projectId}/tasks`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);
//     } catch (err) {
//       console.error('Error fetching tasks:', err);
//     }
//   };

//   // Delete task
//   const handleDeleteTask = async (taskId) => {
//     if (!window.confirm('Are you sure you want to delete this task?')) return;
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/trainer/projects/${projectId}/tasks/${taskId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchTasks();
//     } catch (err) {
//       console.error('Error deleting task:', err);
//     }
//   };

//   // Mark task as completed
//   const markCompleted = async (taskId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:5000/api/trainer/projects/${projectId}/tasks/${taskId}/complete`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchTasks();
//     } catch (err) {
//       console.error('Error marking task completed:', err);
//     }
//   };

//   // Close All Tasks -> only when no pendings; then mark project + program completed
//   const handleCloseAllTasks = async () => {
//     console.log("Closing all tasks for project:", project);

//     const pending = tasks.filter(
//       (t) => String(t.status || '').toLowerCase() !== 'completed'
//     );
//     if (pending.length > 0) {
//       alert('Some tasks are still pending. Please complete them first.');
//       return;
//     }

//     if (!window.confirm('Close all tasks, mark project and program as completed?')) return;

//     setIsClosing(true);
//     try {
//       const token = localStorage.getItem('token');

//       // 1. Mark project as completed
//       await axios.put(
//         `http://localhost:5000/api/trainer/project/${projectId}/status`,
//         { status: 'completed' },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // 2. Mark program as completed (project.program_id must exist)
//       if (project?.program_id) {
//         await axios.put(
//           `http://localhost:5000/api/trainer/program/${project.program_id}/status`,
//           { status: 'completed' },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       }

//       // Update UI instantly
//       setProject((prev) => (prev ? { ...prev, status: 'completed' } : prev));
//       setIsTaskModalOpen(false);
//     } catch (err) {
//       console.error('Error closing tasks / completing project & program:', err);
//       alert('Failed to close tasks');
//     } finally {
//       setIsClosing(false);
//     }
//   };

//   useEffect(() => {
//     const load = async () => {
//       try {
//         await Promise.all([fetchProjectDetails(), fetchTasks()]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [projectId]);

//   const actionButtonClasses =
//     'flex items-center gap-1 text-sm px-2 py-1 border rounded transition';

//   if (loading || !project) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Project Details</h2>

//       <table className="min-w-full bg-white shadow border mb-6">
//         <tbody>
//           <tr>
//             <td className="py-2 px-4 border font-semibold">Title</td>
//             <td className="py-2 px-4 border">{project.title}</td>
//           </tr>
//           <tr>
//             <td className="py-2 px-4 border font-semibold">Description</td>
//             <td className="py-2 px-4 border">{project.description}</td>
//           </tr>
//           <tr>
//             <td className="py-2 px-4 border font-semibold">Status</td>
//             <td className="py-2 px-4 border">
//               {project.status === 'completed' ? (
//                 <span className="text-green-600 font-medium">✅ Completed</span>
//               ) : (
//                 <span className="text-yellow-600 font-medium">Active</span>
//               )}
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       <div className="flex gap-3 mb-4">
//         <button
//           onClick={() => setIsTaskModalOpen(true)}
//           disabled={project.status === 'completed'}
//           className={`px-4 py-2 rounded text-white ${
//             project.status === 'completed'
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           + Task
//         </button>
//       </div>

//       <CreateTaskModal
//         isOpen={isTaskModalOpen}
//         onClose={() => setIsTaskModalOpen(false)}
//         projectId={projectId}
//         onCreated={fetchTasks}
//       />

//       <h3 className="text-xl font-semibold mt-4 mb-2">Tasks under this Project</h3>
//       <table className="min-w-full bg-white shadow border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-2 px-4 border">Task</th>
//             <th className="py-2 px-4 border">Deadline</th>
//             <th className="py-2 px-4 border">Status</th>
//             <th className="py-2 px-4 border text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task) => (
//             <tr key={task.id}>
//               <td className="py-2 px-4 border">{task.title}</td>
//               <td className="py-2 px-4 border">{task.deadline}</td>
//               <td className="py-2 px-4 border">
//                 {String(task.status).toLowerCase() === 'completed' ? (
//                   <span className="text-green-600 font-medium">✅ Completed</span>
//                 ) : (
//                   <span className="text-yellow-600 font-medium">Pending</span>
//                 )}
//               </td>
//               <td className="py-2 px-4 border">
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => {
//                       setTaskToEdit(task);
//                       setIsEditModalOpen(true);
//                     }}
//                     className={`${actionButtonClasses} text-blue-600 border-blue-500 hover:bg-blue-50`}
//                     disabled={project.status === 'completed'}
//                   >
//                     <Pencil size={14} /> Edit
//                   </button>

//                   <button
//                     onClick={() => handleDeleteTask(task.id)}
//                     className="flex items-center gap-1 text-sm text-red-600 px-2 py-1 border border-red-500 rounded hover:bg-red-50"
//                     disabled={project.status === 'completed'}
//                   >
//                     <Trash2 size={14} /> Delete
//                   </button>

//                   {String(task.status).toLowerCase() !== 'completed' &&
//                     project.status !== 'completed' && (
//                       <button
//                         onClick={() => markCompleted(task.id)}
//                         className="text-sm text-green-700 border border-green-600 px-2 py-1 rounded"
//                       >
//                         Mark Completed
//                       </button>
//                     )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//           {tasks.length === 0 && (
//             <tr>
//               <td colSpan="4" className="text-center py-4 text-gray-500">
//                 No tasks found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Close All Tasks Button */}
//       <div className="mt-4">
//         <button
//           onClick={handleCloseAllTasks}
//           className={`px-4 py-2 rounded text-white ${
//             project.status === 'completed'
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-green-600 hover:bg-green-700'
//           }`}
//           disabled={project.status === 'completed' || isClosing}
//         >
//           {project.status === 'completed' ? 'Closed' : isClosing ? 'Closing...' : 'Close All Tasks'}
//         </button>
//       </div>

//       <EditTaskModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         task={taskToEdit}
//         projectId={projectId}
//         onUpdated={fetchTasks}
//       />
//     </div>
//   );
// };

// export default ProjectDetail;










import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import CreateTaskModal from '../components/CreateTaskModal';
import EditTaskModal from '../components/EditTaskModal';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchProjectDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/trainer/project/${projectId}`,
        authHeader
      );
      setProject(res.data);
    } catch (err) {
      console.error('Error fetching project:', err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/trainer/projects/${projectId}/tasks`,
        authHeader
      );
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/trainer/projects/${projectId}/tasks/${taskId}`,
        authHeader
      );
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const markCompleted = async (taskId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/trainer/projects/${projectId}/tasks/${taskId}/complete`,
        {},
        authHeader
      );
      fetchTasks();
    } catch (err) {
      console.error('Error marking task completed:', err);
    }
  };

  const handleCloseAllTasks = async () => {
    const pendingTasks = tasks.filter(
      (t) => String(t.status || '').toLowerCase() !== 'completed'
    );

    if (pendingTasks.length > 0) {
      alert('Some tasks are still pending. Please complete them first.');
      return;
    }

    if (!window.confirm('Close all tasks, mark project and program as completed?')) return;

    setIsClosing(true);
    try {
      await axios.put(
        `http://localhost:5000/api/trainer/project/${projectId}/status`,
        { status: 'completed' },
        authHeader
      );

      if (project?.program_id) {
        await axios.put(
          `http://localhost:5000/api/trainer/program/${project.program_id}/status`,
          { status: 'completed' },
          authHeader
        );
      }

      setProject((prev) => (prev ? { ...prev, status: 'completed' } : prev));
      setIsTaskModalOpen(false);
    } catch (err) {
      console.error('Error closing tasks / completing project & program:', err);
      alert('Failed to close tasks');
    } finally {
      setIsClosing(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        await Promise.all([fetchProjectDetails(), fetchTasks()]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [projectId]);

  const isCompleted = project?.status === 'completed';

  const baseBtn = 'px-4 py-2 rounded transition text-white font-medium';
  const disabledBtn = 'bg-gray-500 cursor-not-allowed';
  const tableClass = 'min-w-full bg-gray-900 text-white shadow border border-gray-700';
  const thTdClass = 'py-2 px-4 border border-gray-700';

  if (loading || !project) return <div className="p-4 text-white">Loading...</div>;

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-4">Project Details</h2>

      <table className={tableClass}>
        <tbody>
          <tr>
            <td className={`${thTdClass} font-semibold`}>Title</td>
            <td className={thTdClass}>{project.title}</td>
          </tr>
          <tr>
            <td className={`${thTdClass} font-semibold`}>Description</td>
            <td className={thTdClass}>{project.description}</td>
          </tr>
          <tr>
            <td className={`${thTdClass} font-semibold`}>Status</td>
            <td className={thTdClass}>
              {isCompleted ? (
                <span className="text-green-400">✅ Completed</span>
              ) : (
                <span className="text-yellow-400">Active</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="my-4">
        <button
          onClick={() => setIsTaskModalOpen(true)}
          disabled={isCompleted}
          className={`${baseBtn} ${
            isCompleted ? disabledBtn : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          + Task
        </button>
      </div>

      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        projectId={projectId}
        onCreated={fetchTasks}
      />

      <h3 className="text-xl font-semibold mt-4 mb-2">Tasks under this Project</h3>
      <table className={tableClass}>
        <thead className="bg-gray-800">
          <tr>
            <th className={thTdClass}>Task</th>
            <th className={thTdClass}>Deadline</th>
            <th className={thTdClass}>Status</th>
            <th className={`${thTdClass} text-center`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const isTaskCompleted = String(task.status).toLowerCase() === 'completed';

            return (
              <tr key={task.id}>
                <td className={thTdClass}>{task.title}</td>
                <td className={thTdClass}>{task.deadline}</td>
                <td className={thTdClass}>
                  {isTaskCompleted ? (
                    <span className="text-green-400">✅ Completed</span>
                  ) : (
                    <span className="text-yellow-400">Pending</span>
                  )}
                </td>
                <td className={thTdClass}>
                  <div className="flex gap-2 flex-wrap justify-center">
                    <button
                      onClick={() => {
                        setTaskToEdit(task);
                        setIsEditModalOpen(true);
                      }}
                      disabled={isCompleted}
                      className="flex items-center gap-1 text-sm text-blue-400 border border-blue-500 px-2 py-1 rounded hover:bg-blue-900 disabled:opacity-40"
                    >
                      <Pencil size={14} /> Edit
                    </button>

                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      disabled={isCompleted}
                      className="flex items-center gap-1 text-sm text-red-400 border border-red-500 px-2 py-1 rounded hover:bg-red-900 disabled:opacity-40"
                    >
                      <Trash2 size={14} /> Delete
                    </button>

                    {!isTaskCompleted && !isCompleted && (
                      <button
                        onClick={() => markCompleted(task.id)}
                        className="text-sm text-green-400 border border-green-500 px-2 py-1 rounded hover:bg-green-900"
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}

          {tasks.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-400">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-6">
               <button
          onClick={handleCloseAllTasks}
          disabled={isCompleted || isClosing}
          className={`${baseBtn} ${
            isCompleted || isClosing
              ? disabledBtn
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isCompleted
            ? 'Closed'
            : isClosing
            ? 'Closing...'
            : 'Close All Tasks'}
        </button>
      </div>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={taskToEdit}
        projectId={projectId}
        onUpdated={fetchTasks}
      />
    </div>
  );
};

export default ProjectDetail;














