import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../styles/HeadquaterHome.css";

function AssignStation() {
  const navigate = useNavigate();
  const [officers, setOfficers] = useState([]);
  const [stations, setStations] = useState([]);

  const [selectedOfficerId, setSelectedOfficerId] = useState("");
  const [selectedStationId, setSelectedStationId] = useState("");
  const [loading, setLoading] = useState(false);

  const adminName = localStorage.getItem("adminName");

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch officers and stations data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [officersRes, stationsRes] = await Promise.all([
        axios.get("http://localhost:8080/officers/officers/unassigned"),
        axios.get("http://localhost:8080/policestation/complaint-stats"),
      ]);
      setOfficers(officersRes.data);
      setStations(stationsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error loading data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminName");
    navigate("/headquarter-login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOfficerId || !selectedStationId) {
      alert("Please select both Officer and Police Station.");
      return;
    }

    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:8080/officers/assign-station?officerId=${selectedOfficerId}&stationId=${selectedStationId}`
      );

      alert("Police Station assigned to Officer successfully!");

      // Reset selections
      setSelectedOfficerId("");
      setSelectedStationId("");

      // Reload data to refresh lists
      fetchData();
    } catch (error) {
      console.error("Error assigning station:", error);
      alert("Failed to assign police station. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="officer-home-container">
        <div className="container officer-home-main">
          <div className="officer-home-header">
            <h3>Welcome, {adminName || "Admin"}</h3>
            <button className="blue-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <h4 className="mb-3">Assign Police Station to Officer</h4>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="officerSelect" className="form-label">
                  Select Officer (Unassigned)
                </label>
                <select
                  id="officerSelect"
                  className="form-control"
                  value={selectedOfficerId}
                  onChange={(e) => setSelectedOfficerId(e.target.value)}
                  required
                >
                  <option value="">-- Select Officer --</option>
                  {officers.map((officer) => (
                    <option key={officer.officerId} value={officer.officerId}>
                      {officer.officerName} (ID: {officer.officerId})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="stationSelect" className="form-label">
                  Select Police Station
                </label>
                <select
                  id="stationSelect"
                  className="form-control"
                  value={selectedStationId}
                  onChange={(e) => setSelectedStationId(e.target.value)}
                  required
                >
                  <option value="">-- Select Police Station --</option>
                  {stations.map((station) => (
                    <option
                      key={station.policeStationId}
                      value={station.policeStationId}
                    >
                      {station.policeStationName} (PIN: {station.policeStationPincode})
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                Assign Station
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AssignStation;
