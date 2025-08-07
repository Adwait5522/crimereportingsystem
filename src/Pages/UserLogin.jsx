// import React from "react";
// import "../styles/UserLoginPage.css";
// import Footer from "../Components/Footer";
// import Header from "../Components/Header";
// import { useNavigate } from "react-router-dom";

// const UserLogin = () => {
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault(); // Prevent page reload
//     // You can add authentication logic here
//     navigate("/complaint");
//   };

//   return (
//     <>
//       <Header />
//       <div className="login-container">
//         <div className="login-card">
//           <h2>Login</h2>
//           <form onSubmit={handleLogin}>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input type="email" id="email" required />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input type="password" id="password" required />
//             </div>

//             <div className="form-options">
//               <label className="form-check-label">
//                 <input type="checkbox" /> Remember me
//               </label>
//               <a href="#" className="text-primary">
//                 Forgot Password?
//               </a>
//             </div>

//             <button type="submit" className="login-btn">
//               Login
//             </button>
//           </form>
//           <div className="text-muted">
//             Don't have an account?{" "}
//             <a href="/register-user-form" className="text-primary">
//               Register here
//             </a>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default UserLogin;







import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UserLoginPage.css';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/users/signin', {
        email,
        password
      });

      const user = response.data;

      // Store user data in localStorage for later use
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to complaints page for any valid user
      navigate('/complaint');

    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="form-options">
              <label className="form-check-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="text-primary">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>
          <div className="text-muted">
            Don't have an account? <a href="#" className="text-primary">Register here</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserLogin;