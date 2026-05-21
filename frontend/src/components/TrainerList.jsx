// import React from 'react';

// const TrainerList = ({ trainers }) => {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Trainer List</h2>
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {trainers.map((trainer) => (
//             <tr key={trainer.id}>
//               <td className="border p-2">{trainer.name}</td>
//               <td className="border p-2">{trainer.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TrainerList;





import React from 'react';

const TrainerList = ({ trainers }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-semibold mb-4">Trainer List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-700 text-left text-sm uppercase text-gray-300">
              <th className="px-4 py-2 border-b border-gray-600">Name</th>
              <th className="px-4 py-2 border-b border-gray-600">Email</th>
            </tr>
          </thead>
          <tbody>
            {trainers.length > 0 ? (
              trainers.map((trainer) => (
                <tr key={trainer.id} className="hover:bg-gray-700 transition">
                  <td className="px-4 py-2 border-b border-gray-700">{trainer.name}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{trainer.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-4 py-4 text-center text-gray-400">
                  No trainers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerList;

