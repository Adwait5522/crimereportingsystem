// import React, { useState } from "react";
// import axios from "axios";
// import Footer from "../Components/Footer";
// import { data, useNavigate } from "react-router-dom"; // ✅ Added
// import { ToastContainer } from "react-toastify";
// import { toast } from "react-toastify";
// const FileComplaintForm = () => {
//   const navigate = useNavigate(); // ✅ Added
// const storedUserId = localStorage.getItem('userId');
//     if (!storedUserId) {
//       console.error("No userId found in localStorage. Redirecting to login.");
//       navigate('/user_login');
//       return;
//     }
//   const [formData, setFormData] = useState({
//     complaintType: "",
//     description: "",
//     city: "",
//     state: "",
//     locationPincode: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const states = [
//     "Maharashtra",
//     "Uttar Pradesh",
//     "Madhya Pradesh",
//     "Delhi",
//     "Bihar",
//     "Rajasthan",
//     "Karnataka",
//     "Others",
//   ];

//   const complaintTypes = [
//     "Theft",
//     "Assault",
//     "Harassment",
//     "Cyber Crime",
//     "Missing Person",
//     "Domestic Violence",
//     "Other",
//   ];

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.complaintType)
//       newErrors.complaintType = "Complaint type is required.";
//     if (!formData.description.trim())
//       newErrors.description = "Description is required.";
//     if (!formData.city.trim()) newErrors.city = "City is required.";
//     if (!formData.state) newErrors.state = "State is required.";
//     if (
//       !formData.locationPincode ||
//       !/^\d{6}$/.test(formData.locationPincode)
//     ) {
//       newErrors.locationPincode = "Valid 6-digit pincode is required.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       // 1️⃣ Get lat/lon from OpenStreetMap
//       const geoRes = await axios.get("http://localhost:8080/api/location/search", {
//       params: { postalcode: formData.locationPincode }
//     });


//       if (!geoRes.data.length) {
//         toast.error("Could not find location for the given pincode.");
//         setLoading(false);
//         return;
//       }

//       const { lat, lon } = geoRes.data[0];
//       console.log(lat+lon);
//       // 2️⃣ Find nearest police station
//       const nearestRes = await axios.post(
//         "http://localhost:8080/policestation/nearest",
//         {
//           latitude: parseFloat(lat),
//           longitude: parseFloat(lon),
//         }
//       );

//       const policeStationId = nearestRes.data.policeStationId;
//       // 3️⃣ Register complaint
//       const complaintPayload = {
//         userId: storedUserId, // TODO: replace with logged-in user ID
//         policeStationId,
//         complaintType: formData.complaintType,
//         description: formData.description,
//         evidenceFiles: [], // handle uploads separately
//         locationPincode: parseInt(formData.locationPincode),
//         city: formData.city,
//         state: formData.state,
//         priority: "MEDIUM",
//       };

//       const regRes = await axios.post(
//         "http://localhost:8080/complaints/register",
//         complaintPayload,
//         { headers: { "Content-Type": "application/json" } }
//       );

//       toast.success(regRes.data.message || "Complaint registered successfully!");

//       navigate("/complaint"); // ✅ Navigate after success

//       setFormData({
//         complaintType: "",
//         description: "",
//         city: "",
//         state: "",
//         locationPincode: "",
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong while submitting the complaint.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="container mt-5 mb-5">
//         <div className="card shadow p-4">
//           <h3 className="mb-4 text-center">Register Complaint</h3>
//           <form onSubmit={handleSubmit} noValidate>
//             {/* Complaint Type */}
//             <div className="mb-3">
//               <label className="form-label">Complaint Type</label>
//               <select
//                 name="complaintType"
//                 className={`form-select ${errors.complaintType ? "is-invalid" : ""}`}
//                 value={formData.complaintType}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Complaint Type</option>
//                 {complaintTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//               {errors.complaintType && (
//                 <div className="invalid-feedback">{errors.complaintType}</div>
//               )}
//             </div>

//             {/* Description */}
//             <div className="mb-3">
//               <label className="form-label">Description</label>
//               <textarea
//                 name="description"
//                 className={`form-control ${errors.description ? "is-invalid" : ""}`}
//                 value={formData.description}
//                 onChange={handleChange}
//               ></textarea>
//               {errors.description && (
//                 <div className="invalid-feedback">{errors.description}</div>
//               )}
//             </div>

//             {/* Pincode */}
//             <div className="mb-3">
//               <label className="form-label">Pincode</label>
//               <input
//                 type="number"

//                 name="locationPincode"
//                 className={`form-control ${errors.locationPincode ? "is-invalid" : ""}`}
//                 value={formData.locationPincode}
//                 onChange={handleChange}
//               />
//               {errors.locationPincode && (
//                 <div className="invalid-feedback">{errors.locationPincode}</div>
//               )}
//             </div>

//             {/* City */}
//             <div className="mb-3">
//               <label className="form-label">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 className={`form-control ${errors.city ? "is-invalid" : ""}`}
//                 value={formData.city}
//                 onChange={handleChange}
//               />
//               {errors.city && (
//                 <div className="invalid-feedback">{errors.city}</div>
//               )}
//             </div>

//             {/* State */}
//             <div className="mb-3">
//               <label className="form-label">State</label>
//               <select
//                 name="state"
//                 className={`form-select ${errors.state ? "is-invalid" : ""}`}
//                 value={formData.state}
//                 onChange={handleChange}
//               >
//                 <option value="">Select State</option>
//                 {states.map((state) => (
//                   <option key={state} value={state}>
//                     {state}
//                   </option>
//                 ))}
//               </select>
//               {errors.state && (
//                 <div className="invalid-feedback">{errors.state}</div>
//               )}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               className="btn btn-primary w-100"
//               disabled={loading}
//             >
//               {loading ? "Submitting..." : "Submit Complaint"}
//             </button>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default FileComplaintForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileComplaintForm = () => {
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem("userId");

  // ✅ Redirect if no userId
  useEffect(() => {
    if (!storedUserId) {
      toast.warn("Please login first."); // optional
      navigate("/user-login");
    }
  }, [storedUserId, navigate]);

  const [formData, setFormData] = useState({
    complaintType: "",
    description: "",
    city: "",
    state: "",
    locationPincode: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const states = [
    "Maharashtra",
    "Uttar Pradesh",
    "Madhya Pradesh",
    "Delhi",
    "Bihar",
    "Rajasthan",
    "Karnataka",
    "Others",
  ];

  const complaintTypes = [
    "Theft",
    "Assault",
    "Harassment",
    "Cyber Crime",
    "Missing Person",
    "Domestic Violence",
    "Other",
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.complaintType)
      newErrors.complaintType = "Complaint type is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (
      !formData.locationPincode ||
      !/^\d{6}$/.test(formData.locationPincode)
    ) {
      newErrors.locationPincode = "Valid 6-digit pincode is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // 1️⃣ Get lat/lon from API
      const geoRes = await axios.get(
        "http://localhost:8080/api/location/search",
        {
          params: { postalcode: formData.locationPincode },
        }
      );

      if (!geoRes.data.length) {
        toast.error("Could not find location for the given pincode.");
        return;
      }

      const { lat, lon } = geoRes.data[0];

      // 2️⃣ Find nearest police station
      const nearestRes = await axios.post(
        "http://localhost:8080/policestation/nearest",
        {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        }
      );

      const policeStationId = nearestRes.data.policeStationId;

      // 3️⃣ Register complaint
      const complaintPayload = {
        userId: storedUserId,
        policeStationId,
        complaintType: formData.complaintType,
        description: formData.description,
        evidenceFiles: [],
        locationPincode: parseInt(formData.locationPincode),
        city: formData.city,
        state: formData.state,
        priority: "MEDIUM",
      };

      const regRes = await axios.post(
        "http://localhost:8080/complaints/register",
        complaintPayload,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(regRes.data.message || "Complaint registered successfully!");

      navigate("/complaint");

      // reset form
      setFormData({
        complaintType: "",
        description: "",
        city: "",
        state: "",
        locationPincode: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong while submitting the complaint."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Render form only if user is logged in */}
      {storedUserId && (
        <div className="container mt-5 mb-5">
          <div className="card shadow p-4">
            <h3 className="mb-4 text-center">Register Complaint</h3>
            <form onSubmit={handleSubmit} noValidate>
              {/* Complaint Type */}
              <div className="mb-3">
                <label className="form-label">Complaint Type</label>
                <select
                  name="complaintType"
                  className={`form-select ${
                    errors.complaintType ? "is-invalid" : ""
                  }`}
                  value={formData.complaintType}
                  onChange={handleChange}
                >
                  <option value="">Select Complaint Type</option>
                  {complaintTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.complaintType && (
                  <div className="invalid-feedback">{errors.complaintType}</div>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>

              {/* Pincode */}
              <div className="mb-3">
                <label className="form-label">Pincode</label>
                <input
                  type="number"
                  name="locationPincode"
                  className={`form-control ${
                    errors.locationPincode ? "is-invalid" : ""
                  }`}
                  value={formData.locationPincode}
                  onChange={handleChange}
                />
                {errors.locationPincode && (
                  <div className="invalid-feedback">
                    {errors.locationPincode}
                  </div>
                )}
              </div>

              {/* City */}
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className={`form-control ${errors.city ? "is-invalid" : ""}`}
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && (
                  <div className="invalid-feedback">{errors.city}</div>
                )}
              </div>

              {/* State */}
              <div className="mb-3">
                <label className="form-label">State</label>
                <select
                  name="state"
                  className={`form-select ${errors.state ? "is-invalid" : ""}`}
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <div className="invalid-feedback">{errors.state}</div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </>
                ) : (
                  "Submit Complaint"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default FileComplaintForm;


