import React, { useState } from "react";
import Footer from "../Components/Footer";

const FileComplaintForm = () => {
  const [formData, setFormData] = useState({
    complaintType: "",
    evidenceFiles: [],
    location: "",
    pincode: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "evidenceFiles") {
      setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.complaintType)
      newErrors.complaintType = "Complaint type is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Valid 6-digit pincode is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Complaint submitted:", formData);
      alert("Complaint submitted successfully!");
      // API call or form reset can go here
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
                className={`form-select ${
                  errors.complaintType ? "is-invalid" : ""
                }`}
                name="complaintType"
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

            {/* Evidence Files */}
            {/* <div className="mb-3">
              <label className="form-label">Upload Evidence Files</label>
              <input
                type="file"
                name="evidenceFiles"
                multiple
                className="form-control"
                onChange={handleChange}
              />
            </div> */}

            {/* Location */}
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className={`form-control ${
                  errors.location ? "is-invalid" : ""
                }`}
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Exact address or area"
              />
              {errors.location && (
                <div className="invalid-feedback">{errors.location}</div>
              )}
            </div>

            {/* Pincode */}
            <div className="mb-3">
              <label className="form-label">Pincode</label>
              <input
                type="number"
                className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6-digit pincode"
              />
              {errors.pincode && (
                <div className="invalid-feedback">{errors.pincode}</div>
              )}
            </div>

            {/* City */}
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                name="city"
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
                className={`form-select ${errors.state ? "is-invalid" : ""}`}
                name="state"
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
            <button type="submit" className="btn btn-primary w-100">
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FileComplaintForm;
