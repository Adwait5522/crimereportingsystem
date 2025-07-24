import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const OfficerLogin = () => {
  const [badgeId, setBadgeId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    badgeId: "",
    password: "",
  });

  const navigate = useNavigate(); //initialize navigate

  const validateForm = () => {
    const newErrors = {};

    if (!badgeId.trim()) {
      newErrors.badgeId = "Badge ID is required.";
    } else if (!/^OFF\d{4}$/i.test(badgeId)) {
      newErrors.badgeId = "Invalid Badge ID format (e.g., OFF1234).";
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
      console.log("Logging in:", { badgeId, password, rememberMe });

      // Set officer name in localStorage
      localStorage.setItem(
        "officerName",
        badgeId === "OFF1234" ? "Officer Sharma" : "Officer Tiwari"
      );

      // Store badgeId if rememberMe is checked
      if (rememberMe) {
        localStorage.setItem("rememberedBadgeId", badgeId);
      } else {
        localStorage.removeItem("rememberedBadgeId");
      }

      // Redirect to officer home page
      navigate("/officer-home");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Officer Login</h3>
        <form onSubmit={handleLogin} noValidate>
          <div className="mb-3">
            <label htmlFor="badgeId" className="form-label">Badge ID</label>
            <input
              type="text"
              id="badgeId"
              className={`form-control ${errors.badgeId ? "is-invalid" : ""}`}
              value={badgeId}
              onChange={(e) => setBadgeId(e.target.value)}
              placeholder="e.g., OFF1234"
            />
            {errors.badgeId && <div className="invalid-feedback">{errors.badgeId}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <a href="/forgot-password" className="text-primary text-decoration-none">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>

          <div className="mt-3 text-center">
            <small className="text-muted">Only authorized officers are allowed.</small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfficerLogin;
