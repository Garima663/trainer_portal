// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TrainerProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/trainer/profile', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setProfile(res.data))
//       .catch((err) => console.error('Error loading profile:', err));
//   }, [token]);

//   if (!profile) return <p className="p-6">Loading profile...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Trainer Profile</h2>
//       <div className="bg-white p-4 rounded shadow space-y-3 max-w-md">
//         <div>
//           <span className="font-semibold">Name: </span>
//           <span>{profile.name}</span>
//         </div>
//         <div>
//           <span className="font-semibold">Email: </span>
//           <span>{profile.email}</span>
//         </div>
//         {/* Add more fields here if needed */}
//       </div>
//     </div>
//   );
// };

// export default TrainerProfile;
