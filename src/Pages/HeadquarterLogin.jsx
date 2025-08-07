import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/HeadquarterLogin.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function HeadquarterLogin() {
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
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
    } else if (!/^HQ\d{1,4}$/i.test(officerId)) {
      newErrors.officerId = "Invalid format (e.g., HQ1, HQ0001).";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const match = officerId.match(/^HQ(\d{1,4})$/i);
      if (!match) {
        setApiError("Invalid Officer ID format.");
        return;
      }

      const adminId = parseInt(match[1], 10); // HQ0001 -> 1

      try {
        const response = await axios.post("http://localhost:8080/admin/signin", {
          adminId,
          password,
        });

        const { adminName, message } = response.data;

        // Save necessary data
        localStorage.setItem("adminId", adminId);
        localStorage.setItem("adminName", adminName);
        localStorage.setItem("hqOfficerMessage", message);

        if (rememberMe) {
          localStorage.setItem("rememberedHqOfficerId", officerId);
        } else {
          localStorage.removeItem("rememberedHqOfficerId");
        }

        navigate("/headquarter-home");
      } catch (error) {
        console.error("Login failed:", error);
        setApiError("Invalid Officer ID or Password.");
      }
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
                className={`form-control ${errors.officerId ? "is-invalid" : ""}`}
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                placeholder="e.g., HQ0001"
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
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
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

            {apiError && <div className="text-danger mb-2">{apiError}</div>}

            <button type="submit" className="login-btn">
              Login
            </button>

            <div className="text-muted mt-2">
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
