import React, { useState } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import { data, useNavigate } from "react-router-dom"; // ✅ Added

const FileComplaintForm = () => {
  const navigate = useNavigate(); // ✅ Added

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
      // 1️⃣ Get lat/lon from OpenStreetMap
      const geoRes = await axios.get(
        `https://nominatim.openstreetmap.org/search?postalcode=${formData.locationPincode}&country=India&format=json`
      );

      if (!geoRes.data.length) {
        alert("Could not find location for the given pincode.");
        setLoading(false);
        return;
      }

      const { lat, lon } = geoRes.data[0];
      console.log(lat);
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
        userId: 1, // TODO: replace with logged-in user ID
        policeStationId,
        complaintType: formData.complaintType,
        description: formData.description,
        evidenceFiles: [], // handle uploads separately
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

      alert(regRes.data.message || "Complaint registered successfully!");

      navigate("/complaint"); // ✅ Navigate after success

      setFormData({
        complaintType: "",
        description: "",
        city: "",
        state: "",
        locationPincode: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting the complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="card shadow p-4">
          <h3 className="mb-4 text-center">Register Complaint</h3>
          <form onSubmit={handleSubmit} noValidate>
            {/* Complaint Type */}
            <div className="mb-3">
              <label className="form-label">Complaint Type</label>
              <select
                name="complaintType"
                className={`form-select ${errors.complaintType ? "is-invalid" : ""}`}
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
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
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
                className={`form-control ${errors.locationPincode ? "is-invalid" : ""}`}
                value={formData.locationPincode}
                onChange={handleChange}
              />
              {errors.locationPincode && (
                <div className="invalid-feedback">{errors.locationPincode}</div>
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
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FileComplaintForm;


// import React, { useState } from "react";
// import axios from "axios";
// import Footer from "../Components/Footer";
// import { useNavigate } from "react-router-dom";

// const FileComplaintForm = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     complaintType: "",
//     description: "",
//     city: "",
//     state: "",
//     locationPincode: "",
//     policeStationId: "", // ✅ Direct selection if needed
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
//     if (!formData.policeStationId)
//       newErrors.policeStationId = "Police station ID is required.";
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
//       // ✅ Directly register complaint without calling /nearest
//       const complaintPayload = {
//         userId: 1, // TODO: replace with logged-in user ID
//         policeStationId: parseInt(formData.policeStationId), // Direct input
//         complaintType: formData.complaintType,
//         description: formData.description,
//         evidenceFiles: [],
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

//       alert(regRes.data.message || "Complaint registered successfully!");
//       navigate("/complaint");

//       setFormData({
//         complaintType: "",
//         description: "",
//         city: "",
//         state: "",
//         locationPincode: "",
//         policeStationId: "",
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong while submitting the complaint.");
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

//             {/* Police Station ID */}
//             <div className="mb-3">
//               <label className="form-label">Police Station ID</label>
//               <input
//                 type="number"
//                 name="policeStationId"
//                 className={`form-control ${errors.policeStationId ? "is-invalid" : ""}`}
//                 value={formData.policeStationId}
//                 onChange={handleChange}
//               />
//               {errors.policeStationId && (
//                 <div className="invalid-feedback">{errors.policeStationId}</div>
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
