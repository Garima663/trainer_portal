



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import InternshipProgramModal from '../components/InternshipProgramModal';
// import axios from 'axios';
// import toast from "react-hot-toast";

// const TrainerDashboard = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [programs, setPrograms] = useState([]);
//   const [editingProgram, setEditingProgram] = useState(null); // 🆕

//   const navigate = useNavigate();


//   const fetchPrograms = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://localhost:5000/api/trainer/programs', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPrograms(res.data);
//     } catch (err) {
//       console.error('Error fetching programs:', err);
//     }
//   };

//   useEffect(() => {
//     fetchPrograms();
//   }, []);

//   const handleEdit = (program) => {
//     setEditingProgram(program); // 🆕 Set the program to edit
//     setModalOpen(true);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Internship Program</h2>
//       <button
//         onClick={() => {
//           setEditingProgram(null); // Create mode
//           setModalOpen(true);
//         }}
//         className="bg-green-600 text-white px-4 py-2 rounded mb-4"
//       >
//         + Create Internship Program
//       </button>

//       <InternshipProgramModal
//         isOpen={modalOpen}
//         onClose={() => {
//           setModalOpen(false);
//           setEditingProgram(null); // Reset editing state
//         }}
//         onCreated={fetchPrograms}
//         editingProgram={editingProgram} // 🆕 Pass the editing program
//       />

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2 px-4 border">Title</th>
//               <th className="py-2 px-4 border">Start Date</th>
//               <th className="py-2 px-4 border">End Date</th>
//               <th className="py-2 px-4 border">Type</th>
//               <th className="py-2 px-4 border">Status</th>
//               <th className="py-2 px-4 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(programs) && programs.map((program) => (
//               <tr key={program.id} className="text-center">
//                 <td className="py-2 px-4 border">{program.title}</td>
//                 <td className="py-2 px-4 border">{program.start_date}</td>
//                 <td className="py-2 px-4 border">{program.end_date}</td>
//                 <td className="py-2 px-4 border">{program.internship_type}</td>
//                 <td className="py-2 px-4 border capitalize">{program.status}</td>
//                 <td className="py-2 px-4 border">
//                   <button
//                     onClick={() => handleEdit(program)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                 </td>
//                 <td className="py-2 px-4 border">
//                   <button
//                     onClick={() => navigate(`/trainer/programs/${program.id}`)}
//                     className="bg-blue-600 text-white px-3 py-1 rounded"
//                   >
//                     View
//                   </button>
//                 </td>
//                 <td className="border px-4 py-2">
//   <button
//     onClick={async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://localhost:5000/api/trainer/programs/send-mail", {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ programId: program.id }),
//         });
//         // console.log("Response status:", res.status);

//         if (res.ok) {
//           toast.success("Mail sent to HR!");
//         } else {
//           toast.error("Failed to send mail");
//         }
//       } catch (err) {
//         console.error("Mail error:", err);
//         toast.error("Error sending mail");
//       }
//     }}
//     className="bg-purple-500 text-white px-3 py-1 rounded"
//   >
//     Send Mail to HR
//   </button>
// </td>


//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TrainerDashboard;





























import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InternshipProgramModal from '../components/InternshipProgramModal';
import axios from 'axios';
import toast from "react-hot-toast";

const TrainerDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [editingProgram, setEditingProgram] = useState(null);
  const navigate = useNavigate();

  const fetchPrograms = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/trainer/programs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrograms(res.data);
    } catch (err) {
      console.error('Error fetching programs:', err);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleEdit = (program) => {
    setEditingProgram(program);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Internship Program</h2>
        <button
          onClick={() => {
            setEditingProgram(null);
            setModalOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded shadow"
        >
          + Create Program
        </button>
      </div>

      <InternshipProgramModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProgram(null);
        }}
        onCreated={fetchPrograms}
        editingProgram={editingProgram}
      />

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-gray-800 border border-gray-700 text-sm">
          <thead className="bg-gray-700 text-gray-200 uppercase">
            <tr>
              <th className="py-3 px-4 border border-gray-700">Title</th>
              <th className="py-3 px-4 border border-gray-700">Start Date</th>
              <th className="py-3 px-4 border border-gray-700">End Date</th>
              <th className="py-3 px-4 border border-gray-700">Type</th>
              <th className="py-3 px-4 border border-gray-700">Status</th>
              <th className="py-3 px-4 border border-gray-700" colSpan="3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(programs) && programs.map((program) => (
              <tr key={program.id} className="text-center border-t border-gray-700 hover:bg-gray-700 transition">
                <td className="py-2 px-4 border border-gray-700">{program.title}</td>
                <td className="py-2 px-4 border border-gray-700">{program.start_date}</td>
                <td className="py-2 px-4 border border-gray-700">{program.end_date}</td>
                <td className="py-2 px-4 border border-gray-700">{program.internship_type}</td>
                <td className="py-2 px-4 border border-gray-700 capitalize">{program.status}</td>

                <td className="py-2 px-2 border border-gray-700">
                  <button
                    onClick={() => handleEdit(program)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow-sm"
                  >
                    Edit
                  </button>
                </td>

                <td className="py-2 px-2 border border-gray-700">
                  <button
                    onClick={() => navigate(`/trainer/programs/${program.id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow-sm"
                  >
                    View
                  </button>
                </td>

                <td className="py-2 px-2 border border-gray-700">
                  <button
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem("token");
                        const res = await fetch("http://localhost:5000/api/trainer/programs/send-mail", {
                          method: "POST",
                          headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ programId: program.id }),
                        });
                        if (res.ok) {
                          toast.success("Mail sent to HR!");
                        } else {
                          toast.error("Failed to send mail");
                        }
                      } catch (err) {
                        console.error("Mail error:", err);
                        toast.error("Error sending mail");
                      }
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded shadow-sm"
                  >
                    Send Mail
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerDashboard;

