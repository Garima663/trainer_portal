import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import TrainerDashboard from './pages/TrainerDashboard';
// import TrainerProfile from './pages/TrainerProfile';
import ProgramPage from './pages/ProgramPage';
import ProgramDetail from './pages/ProgramDetail';
import ProjectDetail from './pages/ProjectDetail';
//  
// import AssignProject from './components/AssignProject';


const App = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Router>
         <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={token && role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/trainer"
          element={token && role === 'trainer' ? <TrainerDashboard /> : <Navigate to="/" />}
        />
    
        {/* <Route path="/trainer-profile" element={<TrainerProfile />} /> */}
         <Route path="/programs" element={<ProgramPage />} />
         <Route path="/trainer/programs/:programId" element={<ProgramDetail />} />
       
         <Route path="/trainer/projects/:projectId" element={<ProjectDetail />} />

      </Routes>
      
    </Router>
  );
};

export default App;
