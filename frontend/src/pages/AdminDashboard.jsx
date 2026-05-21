


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Menu,
//   Users,
//   UserPlus,
//   LogOut,
//   LayoutDashboard,
// } from 'lucide-react';
// import TrainerForm from '../components/TrainerForm';
// import TrainerList from '../components/TrainerList';
// // import TraineeForm from '../components/TraineeForm';
// // import TraineeList from '../components/TraineeList';
// import axios from 'axios';
// import ProgramPage from './ProgramPage';

// const AdminDashboard = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [section, setSection] = useState('dashboard');
//   const [trainers, setTrainers] = useState([]);
//   // const [trainees, setTrainees] = useState([]);
//   const [refresh, setRefresh] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');


//   useEffect(() => {
//      axios
//        .get('http://localhost:5000/api/admin/trainers', {
//          headers: {
//            Authorization: `Bearer ${token}`,
//          },
//        })
//       .then((res) => setTrainers(res.data))
//        .catch((err) => console.error('Error fetching trainers:', err));
//   }, [refresh, token]);




//    const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//   };


//   const handleTrainerAdded = () => {
//      setRefresh(!refresh);
//    };


//   const renderSection = () => {
//     switch (section) {
//       case 'dashboard':
//         return <h2 className="text-xl font-semibold">Welcome, Admin!</h2>;
//       case 'trainers':
//         return (
//           <>
//             <TrainerForm onAdd={handleTrainerAdded} />
//             <TrainerList trainers={trainers} />
//           </>
//         );

   
//    case 'Program':
//         return (
//           <>
//             <ProgramPage/>
            
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`bg-white shadow-md p-4 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
//         <button onClick={() => setCollapsed(!collapsed)} className="mb-6">
//           <Menu />
//         </button>
//         <nav className="space-y-4">
//           <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSection('dashboard')}>
//             <LayoutDashboard size={20} />
//             {!collapsed && <span>Dashboard</span>}
//           </div>
//           <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSection('trainers')}>
//             <Users size={20} />
//             {!collapsed && <span>Trainers</span>}
//           </div>
//           {/* <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSection('trainees')}>
//             <UserPlus size={20} />
//             {!collapsed && <span>Assign Trainees</span>}
//           </div> */}
//           <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSection('Program')}>
//             <LayoutDashboard size={20} />
//             {!collapsed && <span>Program</span>}
//           </div>
//           <div  onClick={handleLogout} className="flex items-center gap-2 cursor-pointer mt-10 text-red-500">
//             <LogOut size={20} />
//             {!collapsed && <span>Logout</span>}
//           </div>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1">
//         {/* Navbar */}
//         <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Admin Panel</h1>
//           <span className="text-sm text-gray-600">NHPC Trainer Portal</span>
//         </div>

//         {/* Section Content */}
//         <div className="p-6">{renderSection()}</div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;






















import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Users,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import TrainerForm from '../components/TrainerForm';
import TrainerList from '../components/TrainerList';
import axios from 'axios';
import ProgramPage from './ProgramPage';

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [section, setSection] = useState('dashboard');
  const [trainers, setTrainers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/admin/trainers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTrainers(res.data))
      .catch((err) => console.error('Error fetching trainers:', err));
  }, [refresh, token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleTrainerAdded = () => {
    setRefresh(!refresh);
  };

  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return <h2 className="text-2xl font-semibold text-white">Welcome, Admin!</h2>;
      case 'trainers':
        return (
          <>
            <TrainerForm onAdd={handleTrainerAdded} />
            <TrainerList trainers={trainers} />
          </>
        );
      case 'Program':
        return <ProgramPage />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`bg-gray-800 p-4 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} shadow-lg`}>
        <button onClick={() => setCollapsed(!collapsed)} className="mb-6 text-gray-400 hover:text-white">
          <Menu />
        </button>
        <nav className="space-y-6">
          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded transition"
            onClick={() => setSection('dashboard')}
          >
            <LayoutDashboard size={20} />
            {!collapsed && <span>Dashboard</span>}
          </div>

          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded transition"
            onClick={() => setSection('trainers')}
          >
            <Users size={20} />
            {!collapsed && <span>Trainers</span>}
          </div>

          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded transition"
            onClick={() => setSection('Program')}
          >
            <LayoutDashboard size={20} />
            {!collapsed && <span>Program</span>}
          </div>

          <div
            onClick={handleLogout}
            className="flex items-center gap-3 cursor-pointer mt-10 text-red-500 hover:text-red-400 px-3 py-2 rounded transition"
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <span className="text-sm text-gray-400">NHPC Trainer Portal</span>
        </div>

        {/* Section Content */}
        <div className="p-6 bg-gray-900 overflow-y-auto">{renderSection()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
