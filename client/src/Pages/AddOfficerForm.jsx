import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddOfficerForm.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddOfficerForm = () => {
  const [form, setForm] = useState({
    officerName: "",
    designationId: "",
    policeStationId: "",
    password: "",
  });

  const [designations, setDesignations] = useState([]);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false); // loader state

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
    setLoading(true); // start loader

    const payload = {
      officerName: form.officerName,
      designationId: parseInt(form.designationId),
      policeStationId: form.policeStationId ? parseInt(form.policeStationId) : null,
    };

    try {
      // 1. Create officer
      const officerResponse = await axios.post("http://localhost:8080/officers", payload);
      const newOfficerId = officerResponse.data;

      // 2. Add login
      const loginPayload = {
        officerId: Number(newOfficerId),
        password: form.password,
      };

      await axios.post("http://localhost:8080/officerlogin/add-login", loginPayload);

      toast.success("Officer and login added successfully!", { autoClose: 3000 });

      setForm({ officerName: "", designationId: "", policeStationId: "", password: "" }); // reset form
    } catch (error) {
      console.error(error);
      toast.error("Error adding officer or login.", { autoClose: 3000 });
    } finally {
      setLoading(false); // stop loader
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
              disabled={loading}
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
              disabled={loading}
            >
              <option value="">Select Designation</option>
              {designations.map((des) => (
                <option key={des.designationId} value={des.designationId.toString()}>
                  {formatDesignation(des.designationName)}
                </option>
              ))}
            </select>
          </div>

          {/* Uncomment if police station selection is required */}
          {/* <div className="mb-3">
            <label className="form-label">Police Station</label>
            <select
              name="policeStationId"
              className="form-control"
              onChange={handleChange}
              value={form.policeStationId}
              disabled={loading}
            >
              <option value="">Select Police Station</option>
              {stations.map((station) => (
                <option key={station.policeStationId} value={station.policeStationId.toString()}>
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
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Officer"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" />

      <Footer />
    </>
  );
};

export default AddOfficerForm;
