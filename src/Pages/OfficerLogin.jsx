// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/login.css"; // This should include the final CSS you shared
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";

// const OfficerLogin = () => {
//   const [badgeId, setBadgeId] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errors, setErrors] = useState({ badgeId: "", password: "" });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedBadge = localStorage.getItem("rememberedBadgeId");
//     if (storedBadge) setBadgeId(storedBadge);
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!badgeId.trim()) {
//       newErrors.badgeId = "Badge ID is required.";
//     } else if (!/^OFF\d{4}$/i.test(badgeId)) {
//       newErrors.badgeId = "Invalid Badge ID format (e.g., OFF1234).";
//     }

//     if (!password.trim()) {
//       newErrors.password = "Password is required.";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       console.log("Logging in:", { badgeId, password, rememberMe });

//       localStorage.setItem(
//         "officerName",
//         badgeId === "OFF1234" ? "Officer Sharma" : "Officer Tiwari"
//       );

//       if (rememberMe) {
//         localStorage.setItem("rememberedBadgeId", badgeId);
//       } else {
//         localStorage.removeItem("rememberedBadgeId");
//       }

//       navigate("/officer-home");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="officer-login-container">
//         <div className="officer-login-card">
//           <h3>Officer Login</h3>
//           <form onSubmit={handleLogin} noValidate>
//             <div className="form-group">
//               <label htmlFor="badgeId">Badge ID</label>
//               <input
//                 type="text"
//                 id="badgeId"
//                 className={`form-control ${errors.badgeId ? "is-invalid" : ""}`}
//                 value={badgeId}
//                 onChange={(e) => setBadgeId(e.target.value)}
//                 placeholder="e.g., OFF1234"
//               />
//               {errors.badgeId && (
//                 <div className="invalid-feedback">{errors.badgeId}</div>
//               )}
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className={`form-control ${
//                   errors.password ? "is-invalid" : ""
//                 }`}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter password"
//               />
//               {errors.password && (
//                 <div className="invalid-feedback">{errors.password}</div>
//               )}
//             </div>

//             <div className="form-options">
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id="rememberMe"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                 />
//                 <label className="form-check-label" htmlFor="rememberMe">
//                   Remember Me
//                 </label>
//               </div>
//               <a href="/forgot-password" className="text-primary">
//                 Forgot Password?
//               </a>
//             </div>

//             <button type="submit" className="login-btn">
//               Login
//             </button>

//             <div className="text-muted">
//               Only authorized officers are allowed.
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default OfficerLogin;







// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/login.css";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";

// const OfficerLogin = () => {
//   const [badgeId, setBadgeId] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errors, setErrors] = useState({ badgeId: "", password: "" });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedBadge = localStorage.getItem("rememberedBadgeId");
//     if (storedBadge) setBadgeId(storedBadge);
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!badgeId.trim()) {
//       newErrors.badgeId = "Badge ID is required.";
//     } else if (!/^OFF\d{1,4}$/i.test(badgeId)) {
//       newErrors.badgeId = "Invalid Badge ID format (e.g., OFF101).";
//     }

//     if (!password.trim()) {
//       newErrors.password = "Password is required.";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       try {
//         const officerId = parseInt(badgeId.replace("OFF", ""));
//         const response = await fetch("http://localhost:8080/officers/signin", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ officerId, password }),
//         });

//         if (!response.ok) {
//           const err = await response.json();
//           alert(err.mesg || "Login failed. Try again.");
//           return;
//         }

//         const data = await response.json();
//         console.log("Login response:", data);

//         // Store login info
//         localStorage.setItem("officerId", badgeId);
//         localStorage.setItem("designationId", data.designationId);
//         localStorage.setItem("loginMessage", data.message);

//         if (rememberMe) {
//           localStorage.setItem("rememberedBadgeId", badgeId);
//         } else {
//           localStorage.removeItem("rememberedBadgeId");
//         }

//         // Redirect based on role
//         if (data.designationId === 1) {
//           navigate("/inspector-home");
//         } 
//         else if (data.designationId === 2) {
//           navigate("/officer-home");
//         } 
//         else 
//         {
//           alert("Access denied: Unknown designation.");
//         }
//       } catch (error) {
//         console.error("Login error:", error);
//         alert("Login failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="officer-login-container">
//         <div className="officer-login-card">
//           <h3>Officer Login</h3>
//           <form onSubmit={handleLogin} noValidate>
//             <div className="form-group">
//               <label htmlFor="badgeId">Badge ID</label>
//               <input
//                 type="text"
//                 id="badgeId"
//                 className={`form-control ${errors.badgeId ? "is-invalid" : ""}`}
//                 value={badgeId}
//                 onChange={(e) => setBadgeId(e.target.value)}
//                 placeholder="e.g., OFF101"
//               />
//               {errors.badgeId && (
//                 <div className="invalid-feedback">{errors.badgeId}</div>
//               )}
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className={`form-control ${errors.password ? "is-invalid" : ""}`}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter password"
//               />
//               {errors.password && (
//                 <div className="invalid-feedback">{errors.password}</div>
//               )}
//             </div>

//             <div className="form-options">
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id="rememberMe"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                 />
//                 <label className="form-check-label" htmlFor="rememberMe">
//                   Remember Me
//                 </label>
//               </div>
//               <a href="/forgot-password" className="text-primary">
//                 Forgot Password?
//               </a>
//             </div>

//             <button type="submit" className="login-btn">
//               Login
//             </button>

//             <div className="text-muted mt-2">
//               Only authorized officers are allowed.
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default OfficerLogin;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const OfficerLogin = () => {
  const [badgeId, setBadgeId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ badgeId: "", password: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const storedBadge = localStorage.getItem("rememberedBadgeId");
    if (storedBadge) setBadgeId(storedBadge);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!badgeId.trim()) {
      newErrors.badgeId = "Badge ID is required.";
    } else if (!/^OFF\d{1,4}$/i.test(badgeId)) {
      newErrors.badgeId = "Invalid Badge ID format (e.g., OFF101).";
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
      try {
        const officerId = parseInt(badgeId.replace("OFF", ""));
        const response = await fetch("http://localhost:8080/officers/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ officerId, password }),
        });

        if (!response.ok) {
          const err = await response.json();
          alert(err.mesg || "Login failed. Try again.");
          return;
        }

        const data = await response.json();
        console.log("Login response:", data);

        // Store login info
        localStorage.setItem("officerId", officerId);
        localStorage.setItem("designationId", data.designationId);
        localStorage.setItem("loginMessage", data.message);

        if (rememberMe) {
          localStorage.setItem("rememberedBadgeId", badgeId);
        } else {
          localStorage.removeItem("rememberedBadgeId");
        }

        // Redirect based on role
        if (data.designationId === 1) {
          navigate("/inspector-home");
        } 
        else if (data.designationId === 2) {
          navigate("/officer-home");
        } 
        else 
        {
          alert("Access denied: Unknown designation.");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="officer-login-container">
        <div className="officer-login-card">
          <h3>Officer Login</h3>
          <form onSubmit={handleLogin} noValidate>
            <div className="form-group">
              <label htmlFor="badgeId">Badge ID</label>
              <input
                type="text"
                id="badgeId"
                className={`form-control ${errors.badgeId ? "is-invalid" : ""}`}
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
                placeholder="e.g., OFF101"
              />
              {errors.badgeId && (
                <div className="invalid-feedback">{errors.badgeId}</div>
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
              <a href="/forgot-password" className="text-primary">
                Forgot Password?
              </a>
            </div>

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
};

export default OfficerLogin;