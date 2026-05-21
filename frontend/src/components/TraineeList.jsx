// // components/TraineeList.jsx
// import React from 'react';

// const TraineeList = ({ trainees }) => {
//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold mb-2">Trainee List</h2>
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Trainer</th>
//           </tr>
//         </thead>
//         <tbody>
//           {trainees.map((trainee) => (
//             <tr key={trainee.id}>
//               <td className="border p-2">{trainee.name}</td>
//               <td className="border p-2">{trainee.email}</td>
//               <td className="border p-2">{trainee.trainer_name}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TraineeList;

import React from 'react';

const TraineeList = ({ trainees }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">My Trainees</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {trainees.map((trainee) => (
            <tr key={trainee.id}>
              <td className="border p-2">{trainee.name}</td>
              <td className="border p-2">{trainee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TraineeList;

