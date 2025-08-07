import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../styles/SeeOfficers.css";

function SeeOfficers() {
  const [officers, setOfficers] = useState([]);
  const [filteredOfficers, setFilteredOfficers] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch officers
    axios
      .get("http://localhost:8080/officers/officers")
      .then((res) => {
        setOfficers(res.data);
        setFilteredOfficers(res.data);
      })
      .catch((err) => console.error("Error fetching officers:", err));

    // Fetch police stations
    axios
      .get("http://localhost:8080/policestation")
      .then((res) => {
        setStations(res.data);
      })
      .catch((err) => console.error("Error fetching police stations:", err));
  }, []);

  useEffect(() => {
    if (selectedStation === "All") {
      setFilteredOfficers(officers);
    } else if (selectedStation === "Not Assigned") {
      const filtered = officers.filter(
        (officer) =>
          officer.policeStationName === null ||
          officer.policeStationName === "Not Assigned"
      );
      setFilteredOfficers(filtered);
    } else {
      const filtered = officers.filter(
        (officer) => officer.policeStationName === selectedStation
      );
      setFilteredOfficers(filtered);
    }
  }, [selectedStation, officers]);

  const formatOfficerId = (id) => {
    return `OFF${id.toString().padStart(2, "0")}`;
  };

  const formatDesignation = (designation) => {
    return designation
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

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
            Filter by Police Station:
          </label>
          <select
            id="stationSelect"
            className="form-select"
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Not Assigned">Not Assigned</option>
            {stations.map((station) => (
              <option
                key={station.policeStationId}
                value={station.policeStationName}
              >
                {station.policeStationName}
              </option>
            ))}
          </select>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Officer ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Police Station</th>
              </tr>
            </thead>
            <tbody>
              {filteredOfficers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No officers found.
                  </td>
                </tr>
              ) : (
                filteredOfficers.map((officer) => (
                  <tr key={officer.officerId}>
                    <td>{formatOfficerId(officer.officerId)}</td>
                    <td>{officer.officerName}</td>
                    <td>{formatDesignation(officer.designation)}</td>
                    <td>{officer.policeStationName || "Not Assigned"}</td>
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
