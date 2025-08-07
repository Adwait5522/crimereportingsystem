import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../styles/SeeOfficers.css";

function SeeOfficers() {
  const [officers, setOfficers] = useState([]);
  const [filteredOfficers, setFilteredOfficers] = useState([]);
  const [stationIds, setStationIds] = useState([]);
  const [selectedStationId, setSelectedStationId] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all officers
    axios
      .get("http://localhost:8080/officers")
      .then((response) => {
        setOfficers(response.data);
        setFilteredOfficers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching officers:", error);
      });

    // Fetch all station IDs
    axios
      .get("http://localhost:8080/policestation")
      .then((response) => {
        const ids = response.data.map((station) => station.policeStationId);
        setStationIds(ids);
      })
      .catch((error) => {
        console.error("Error fetching police stations:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedStationId === "All") {
      setFilteredOfficers(officers);
    } else {
      const filtered = officers.filter(
        (officer) => officer.policeStationId === parseInt(selectedStationId)
      );
      setFilteredOfficers(filtered);
    }
  }, [selectedStationId, officers]);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Officers List</h3>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="stationSelect" className="form-label">
            Filter by Police Station ID:
          </label>
          <select
            id="stationSelect"
            className="form-select"
            value={selectedStationId}
            onChange={(e) => setSelectedStationId(e.target.value)}
          >
            <option value="All">All</option>
            {stationIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Station ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredOfficers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No officers found.
                  </td>
                </tr>
              ) : (
                filteredOfficers.map((officer) => (
                  <tr key={officer.officerId}>
                    <td>{officer.officerId}</td>
                    <td>{officer.officerName}</td>
                    <td>{officer.email}</td>
                    <td>{officer.designation}</td>
                    <td>{officer.policeStationId}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SeeOfficers;
