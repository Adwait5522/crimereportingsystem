import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import "../styles/HeadquaterHome.css";
import Header from "../Components/Header";
import axios from "axios"; // ⬅️ import axios

function HeadquarterHome() {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const adminName = localStorage.getItem("adminName");


  // Fetch police station stats on mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/policestation/complaint-stats")
      .then((response) => {
        console.log(response.data);
        setStations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching station data:", error);
      });
  }, []);

  const handleLogout = () => {
      localStorage.removeItem("adminId");
    localStorage.removeItem("adminName");
    localStorage.removeItem("hqOfficerMessage");
    navigate("/headquarter-login");
  };

  return (
    <>
      <div className="officer-home-container">
        <div className="container officer-home-main">
          <div className="officer-home-header">
            <h3>Welcome, {adminName || "Admin"}</h3>
            <button className="blue-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="row justify-content-center g-3 mb-4">
            <div className="col-6 col-sm-3">
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate("/add-station")}
              >
                Add Station
              </button>
            </div>
            <div className="col-6 col-sm-3">
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate("/add-officer")}
              >
                Add Officer
              </button>
            </div>
            <div className="col-6 col-sm-3">
              <button className="btn btn-primary w-100" onClick={() => navigate("/feedback-complaints")}>Complaints</button>
            </div>
            <div className="col-6 col-sm-3">
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate("/add-designation")}
              >
                Add Designation
              </button>
            </div>
             <div className="col-6 col-sm-3">
            <button
              className="btn btn-primary w-100"
              onClick={() => navigate("/display-officers")}
            >
              See Officers
            </button>
           </div>
           <div className="col-6 col-sm-3">
            <button
              className="btn btn-primary w-100"
              onClick={() => navigate("/assign-station")}
            >
              Assign Station to Officer
            </button>
           </div>
          </div>

          <h4 className="mb-3">Total Police Stations</h4>

          <div className="table-responsive">
            <table className="case-table table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>PIN</th>
                  <th>Inspector</th>
                  <th>Resolved Cases</th>
                  <th>Unresolved Cases</th>
                </tr>
              </thead>
              <tbody>
                {stations.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  stations.map((station) => (
                    <tr key={station.policeStationId}>
                      <td>{station.policeStationId}</td>
                      <td>{station.policeStationName}</td>
                      <td>{station.policeStationPincode}</td>
                      <td>{station.inchargeName}</td>
                      <td>{station.resolvedCount}</td>
                      <td>{station.unresolvedCount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HeadquarterHome;
