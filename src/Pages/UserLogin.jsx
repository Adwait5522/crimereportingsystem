import React from "react";
import "../styles/UserLoginPage.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page reload
    // You can add authentication logic here
    navigate("/complaint");
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required />
            </div>

            <div className="form-options">
              <label className="form-check-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="text-primary">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <div className="text-muted">
            Don't have an account?{" "}
            <a href="#" className="text-primary">
              Register here
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserLogin;
