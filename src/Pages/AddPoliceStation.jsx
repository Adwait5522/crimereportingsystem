import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import "../styles/AddPoliceStation.css";

const AddPoliceStation = () => {
  const [investigatingOfficers, setInvestigatingOfficers] = useState([]);
  const [selectedOfficerId, setSelectedOfficerId] = useState("");
  const [stationForm, setStationForm] = useState({
    name: "",
    pincode: "",
    mapLink: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/officers/inspectors")
      .then(res => setInvestigatingOfficers(res.data))
      .catch(err => console.error("Error fetching investigating officers:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStationForm({ ...stationForm, [name]: value });
  };

  const handleOfficerChange = (e) => {
    setSelectedOfficerId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOfficerId) {
      alert("Please select a Station Incharge.");
      return;
    }

    try {
      const stationPayload = {
        policeStationName: stationForm.name,
        policeStationPincode: parseInt(stationForm.pincode),
        stationHeadId: parseInt(selectedOfficerId),
        numberOfOfficers: 0,
        mapsLink: stationForm.mapLink
      };

      console.log("Sending station registration data:", stationPayload);

      await axios.post("http://localhost:8080/policestation", stationPayload);

      await axios.patch(`http://localhost:8080/officers/update-designation-incharge?id=${selectedOfficerId}`);

      alert("Police Station registered and Officer promoted to Station Incharge!");

      // Redirect to Headquarter Home
      navigate("/headquarter-home");

    } catch (error) {
      console.error("Error registering station or updating designation:", error);
      alert("Something went wrong while processing the request.");
    }
  };

  return (
    <>
      <Header />

      <div className="card">
        <h2>Police Station Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Police Station Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Police Station Name"
              value={stationForm.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Police Station Pincode</label>
            <input
              type="number"
              name="pincode"
              className="form-control"
              placeholder="Police Station Pincode"
              value={stationForm.pincode}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Google Map Location Link</label>
            <input
              type="text"
              name="mapLink"
              className="form-control"
              placeholder="Google Map Location Link"
              value={stationForm.mapLink}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="investigatingOfficerSelect">Select Station Incharge</label>
            <select
              id="investigatingOfficerSelect"
              className="form-control"
              value={selectedOfficerId}
              onChange={handleOfficerChange}
              required
            >
              <option value="">Select Station Incharge</option>
              {investigatingOfficers.map(officer => (
                <option key={officer.officerId} value={officer.officerId}>
                  {officer.officerName}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Register Police Station</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default AddPoliceStation;
