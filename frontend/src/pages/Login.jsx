// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '', role: 'admin' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log('handleLogin called');
//     setError('');
//     try {
//       console.log('Sending login request with formData:', formData);
//       const res = await axios.post('http://localhost:5000/api/auth/login', formData);
//       console.log('Login response:', res.data);
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('role', res.data.role);

//       // Redirect based on role
//       if (res.data.role === 'admin') {
//         console.log('Navigating to /admin');
//         navigate('/admin');
//       } else {
//         console.log('Navigating to /trainer');
//         navigate('/trainer');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   // return (
//   //   <div className="flex justify-center items-center h-screen">
//   //     <form onSubmit={handleLogin} className="bg-white shadow-md p-8 rounded space-y-4 w-80">
//   //       <h2 className="text-xl font-bold text-center">Login</h2>
//   //       {error && <p className="text-red-600 text-sm">{error}</p>}
//   //       <input
//   //         type="email"
//   //         name="email"
//   //         placeholder="Email"
//   //         className="border w-full p-2"
//   //         value={formData.email}
//   //         onChange={handleChange}
//   //         required
//   //       />
//   //       <input
//   //         type="password"
//   //         name="password"
//   //         placeholder="Password"
//   //         className="border w-full p-2"
//   //         value={formData.password}
//   //         onChange={handleChange}
//   //         required
//   //       />
//   //       <select
//   //         name="role"
//   //         className="border w-full p-2"
//   //         value={formData.role}
//   //         onChange={handleChange}
//   //       >
//   //         <option value="admin">Admin</option>
//   //         <option value="trainer">Trainer</option>
//   //       </select>
//   //       <button
//   //         type="submit"
//   //         className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
//   //       >
//   //         Login
//   //       </button>
//   //     </form>
//   //   </div>
//   // );


// return (
//   <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
//     <form
//       onSubmit={handleLogin}
//       className="bg-white shadow-xl rounded-xl p-10 w-full max-w-sm space-y-6 transform transition-all duration-300 hover:scale-105"
//     >
//       <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
//       {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//         value={formData.password}
//         onChange={handleChange}
//         required
//       />
//       <select
//         name="role"
//         className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//         value={formData.role}
//         onChange={handleChange}
//       >
//         <option value="admin">Admin</option>
//         <option value="trainer">Trainer</option>
//       </select>
//       <button
//         type="submit"
//         className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
//       >
//         Login
//       </button>
//     </form>
//   </div>
// );




// };

// export default Login;





import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'admin' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/trainer');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 shadow-lg rounded-xl p-10 w-full max-w-sm space-y-6"
      >
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="w-55 h-20 "
          />
        </div>

        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="admin">Admin</option>
          <option value="trainer">Trainer</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
