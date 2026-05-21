// import React, { useState } from "react";
// import axios from "axios";

// const InternshipProgramModal = ({ isOpen, onClose, onCreated }) => {
//   const [title, setTitle] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [type, setType] = useState("");
//   const [status, setStatus] = useState("active");

//   if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://localhost:5000/api/trainer/create-program",
//         { title, startDate,endDate, internshipType: type, status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       onCreated();
//       onClose();
//       setTitle("");
//       setStartDate("");
//       setEndDate("");
//       setType("");
//       setStatus("active");
//     } catch (err) {
//       console.error("Error creating internship program:", err);
//       alert("Failed to create internship program");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Create Internship Program</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Start Date</label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">End Date</label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Type of Internship</label>
//             <select
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="w-full border rounded px-3 py-2"
//               required
//             >
//               <option value="">Select Type</option>
//               <option value="NITI Aayog scheme">NITI Aayog scheme</option>
//               <option value="Corporate Internship">Corporate Internship</option>
//               <option value="Reference">Reference</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Status</label>
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="w-full border rounded px-3 py-2"
//               required
//             >
//               <option value="active">Active</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           <div className="flex justify-end gap-2 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 border rounded bg-blue-600 text-white hover:bg-blue-700"
//             >
//               Create
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InternshipProgramModal;






import React, { useState } from "react";
import axios from "axios";

const InternshipProgramModal = ({ isOpen, onClose, onCreated }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("active");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/trainer/create-program",
        {
          title,
          startDate,
          endDate,
          internshipType: type,
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onCreated();
      onClose();
      setTitle("");
      setStartDate("");
      setEndDate("");
      setType("");
      setStatus("active");
    } catch (err) {
      console.error("Error creating internship program:", err);
      alert("Failed to create internship program");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold mb-4">Create Internship Program</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 placeholder-gray-400 text-white"
              placeholder="Enter program title"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 font-medium mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 font-medium mb-1">Type of Internship</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              required
            >
              <option value="">Select Type</option>
              <option value="NITI Aayog scheme">NITI Aayog scheme</option>
              <option value="Corporate Internship">Corporate Internship</option>
              <option value="Reference">Reference</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              required
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternshipProgramModal;



