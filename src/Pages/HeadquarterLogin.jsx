import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HeadquarterLogin.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function HeadquarterLogin() {
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedOfficerId = localStorage.getItem("rememberedHqOfficerId");
    if (storedOfficerId) {
      setOfficerId(storedOfficerId);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!officerId.trim()) {
      newErrors.officerId = "Officer ID is required.";
    } else if (!/^HQ\d{4}$/i.test(officerId)) {
      newErrors.officerId = "Invalid format (e.g., HQ1234).";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("HQ Officer Logging in:", {
        officerId,
        password,
        rememberMe,
      });

      localStorage.setItem(
        "hqOfficerName",
        officerId === "HQ0001" ? "HQ Admin Tiwari" : "HQ Officer"
      );

      if (rememberMe) {
        localStorage.setItem("rememberedHqOfficerId", officerId);
      } else {
        localStorage.removeItem("rememberedHqOfficerId");
      }

      navigate("/headquarter-home"); // Redirect to admin dashboard
    }
  };

  return (
    <>
      <Header />
      <div className="hq-login-container">
        <div className="hq-login-card">
          <h3>Headquarter Login</h3>
          <form onSubmit={handleLogin} noValidate>
            <div className="form-group">
              <label htmlFor="officerId">Officer ID</label>
              <input
                type="text"
                id="officerId"
                className={`form-control ${
                  errors.officerId ? "is-invalid" : ""
                }`}
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                placeholder="e.g., HQ1234"
              />
              {errors.officerId && (
                <div className="invalid-feedback">{errors.officerId}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="form-options">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
              <a href="/forgot-password" className="text-primary">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <div className="text-muted">
              Only authorized officers are allowed.
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HeadquarterLogin;
