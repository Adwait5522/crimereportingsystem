// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/UserLoginPage.css';
// import Footer from '../Components/Footer';
// import Header from '../Components/Header';

// const UserLogin = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:8080/users/signin', {
//         email,
//         password
//       });

//       const user = response.data;
//       // Save user data in localStorage
//       localStorage.setItem('user', JSON.stringify(user));
//       localStorage.setItem('userId', user.userId);

//       // If your backend also sends a token, store it
//       if (user.token) {
//         localStorage.setItem('token', user.token);
//       }

//       navigate('/complaint');
//     } catch (err) {
//       console.error(err);
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="login-container">
//         <div className="login-card">
//           <h2>Login</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input 
//                 type="email" 
//                 id="email" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//                 required 
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input 
//                 type="password" 
//                 id="password" 
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//                 required 
//               />
//             </div>

//             {error && <p className="error-text">{error}</p>}

//             <div className="form-options">
//               <label className="form-check-label">
//                 <input type="checkbox" /> Remember me
//               </label>
//             </div>

//             <button type="submit" className="login-btn">Login</button>
//           </form>
//           <div className="text-muted">
//             Don't have an account? <a href="/register-user-form" className="text-primary">Register here</a>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default UserLogin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserLoginPage.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/users/signin", {
        email,
        password,
      });

      const user = response.data;

      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.userId);

      if (user.token) {
        localStorage.setItem("token", user.token);
      }

      toast.success("Login successful!");
      navigate("/complaint");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Email */}
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

            {/* Password */}
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

            {/* Remember me */}
            <div className="form-options">
              <label className="form-check-label">
                <input type="checkbox" /> Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-btn d-flex justify-content-center align-items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-muted mt-3">
            Don't have an account?{" "}
            <a href="/register-user-form" className="text-primary">
              Register here
            </a>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default UserLogin;
