import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import "../styles/HeadquaterHome.css";
import Header from "../Components/Header";

function HeadquarterHome() {
  const navigate = useNavigate();

  // Get adminName from localStorage
  const adminName = localStorage.getItem("adminName");

  useEffect(() => {
    if (!adminName) {
      navigate("/headquarter-home"); // Redirect if not logged in
    }
  }, [navigate, adminName]);

  const handleLogout = () => {
    localStorage.removeItem("adminName");
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

          {/* Buttons section similar to your original */}
          <div className="row justify-content-center g-3 mb-4">
            <div className="col-6 col-sm-3">
              <button className="btn btn-primary w-100">Add Station</button>
            </div>
            <div className="col-6 col-sm-3">
              <button className="btn btn-primary w-100">Add Officer</button>
            </div>
            <div className="col-6 col-sm-3">
              <button className="btn btn-primary w-100">Complaints</button>
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
                <tr>
                  <td>101</td>
                  <td>Central Station</td>
                  <td>411001</td>
                  <td>Raj Sharma</td>
                  <td>150</td>
                  <td>25</td>
                </tr>
                <tr>
                  <td>102</td>
                  <td>North Station</td>
                  <td>411002</td>
                  <td>Priya Iyer</td>
                  <td>120</td>
                  <td>40</td>
                </tr>
                <tr>
                  <td>103</td>
                  <td>East Station</td>
                  <td>411003</td>
                  <td>Ajay Singh</td>
                  <td>95</td>
                  <td>10</td>
                </tr>
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
