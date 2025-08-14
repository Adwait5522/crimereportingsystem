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
    password: "",           // Added password state
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
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      officerName: form.officerName,
      designationId: parseInt(form.designationId),
      policeStationId: form.policeStationId ? parseInt(form.policeStationId) : null,
    };

    try {
      // 1. Create officer, get the new officer ID from response
      const officerResponse = await axios.post("http://localhost:8080/officers", payload);
      const newOfficerId = officerResponse.data; // assuming the server returns just the ID as string or number

      console.log("New officer ID:", newOfficerId);

      // 2. Now add login with officerId and password
      const loginPayload = {
        officerId: Number(newOfficerId),
        password: form.password,
      };

      await axios.post("http://localhost:8080/officerlogin/add-login", loginPayload);

      alert("Officer and login added successfully!");

      // Reset form after success
      setForm({ officerName: "", designationId: "", policeStationId: "", password: "" });
    } catch (error) {
      console.error(error);
      alert("Error adding officer or login.");
    }
  };

  const formatDesignation = (value) =>
    value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

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

          {/* If you want to enable police station select again, just uncomment */}
          {/* <div className="mb-3">
            <label className="form-label">Police Station</label>
            <select
              name="policeStationId"
              className="form-control"
              onChange={handleChange}
              value={form.policeStationId}
            >
              <option value="">Select Police Station</option>
              {stations.map((station) => (
                <option
                  key={station.policeStationId}
                  value={station.policeStationId.toString()}
                >
                  {capitalize(station.policeStationName)}
                </option>
              ))}
            </select>
          </div> */}

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Set Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

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