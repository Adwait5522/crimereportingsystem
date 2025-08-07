import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddOfficerForm.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const AddOfficerForm = () => {
  const [form, setForm] = useState({
    officerName: "",
    designationId: "",
    policeStationId: "",
  });

  const [designations, setDesignations] = useState([]);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/designation")
      .then((res) => setDesignations(res.data))
      .catch((err) => console.error("Error fetching designations:", err));

    axios
      .get("http://localhost:8080/policestation/active-station")
      .then((res) => setStations(res.data))
      .catch((err) => console.error("Error fetching police stations:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); // Keep values as strings for select control
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      officerName: form.officerName,
      designationId: parseInt(form.designationId),
      policeStationId: parseInt(form.policeStationId),
    };
    console.log("Data to send:", payload);  // <-- Log the payload here
    try {
      await axios.post("http://localhost:8080/officers", payload);
      alert("Officer added successfully!");
      // Optionally reset form here
      setForm({ officerName: "", designationId: "", policeStationId: "" });
    } catch (error) {
      console.error(error);
      alert("Error adding officer.");
    }
  };

  const formatDesignation = (value) =>
    value
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  return (
    <>
      <Header />
      <div className="card">
        <h2>Add Officer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Officer Name</label>
            <input
              type="text"
              name="officerName"
              className="form-control"
              placeholder="Officer Name"
              value={form.officerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Designation</label>
            <select
              name="designationId"
              className="form-control"
              onChange={handleChange}
              value={form.designationId}
              required
            >
              <option value="">Select Designation</option>
              {designations.map((des) => (
                <option key={des.designationId} value={des.designationId.toString()}>
                  {formatDesignation(des.designationName)}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="mb-3">
            <label className="form-label">Police Station</label>
            <select
              name="policeStationId"
              className="form-control"
              onChange={handleChange}
              value={form.policeStationId}
              required
            >
              <option value="">Select Police Station</option>
              {stations.map((station) => (
                <option
                  key={station.policeStationId}
                  value={station.policeStationId}
                >
                  {capitalize(station.policeStationName)}
                </option>
              ))}
            </select>
          </div> */}

          <button type="submit" className="btn btn-primary">
            Add Officer
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddOfficerForm;
