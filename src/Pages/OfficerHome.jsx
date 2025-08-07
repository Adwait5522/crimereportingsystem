import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import "../styles/OfficerHome.css";
import axios from "axios";

const OfficerHome = () => {
  const navigate = useNavigate();

  const loggedInOfficerName = localStorage.getItem("officerName") || "Officer";
  const loggedInOfficerId = localStorage.getItem("officerId");

  const [statusFilter, setStatusFilter] = useState("All");
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);

  useEffect(() => {
    if (!loggedInOfficerId) {
      console.error("No officer ID found in localStorage.");
      return;
    }

    axios
      .get(`http://localhost:8080/officers/${loggedInOfficerId}/complaints`)
      .then((res) => {
        const complaints = res.data.map((item) => ({
          id: `C${item.complaintId.toString().padStart(3, "0")}`,
          complaintId: item.complaintId,
          title: item.description,
          complaintType: item.complaintType,
          city: item.city,
          state: item.state,
          status: capitalize(item.status),
          priority: capitalize(item.priority),
        }));
        setCases(complaints);
      })
      .catch((err) => console.error("Error fetching complaints:", err));
  }, [loggedInOfficerId]);

  useEffect(() => {
    let officerCases = [...cases];
    if (statusFilter !== "All") {
      officerCases = officerCases.filter((c) => c.status === statusFilter);
    }
    setFilteredCases(officerCases);
  }, [cases, statusFilter]);

  const handleStatusChange = (caseId, newStatus) => {
    setCases((prevCases) =>
      prevCases.map((c) => (c.id === caseId ? { ...c, status: newStatus } : c))
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/officer-login");
  };

  const goToCaseDetails = (complaintId) => {
    navigate(`/case/${complaintId}`);
  };

  return (
    <div className="officer-home-container">
      <div className="container officer-home-main">
        <div className="officer-home-header">
          <h3>Welcome Officer, {loggedInOfficerName}</h3>
          <button className="btn btn-secondary mb-3" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="mb-3">
          <label className="status-filter-label">Filter by Status:</label>
          <select
            className="status-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Investigating">Investigating</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {filteredCases.length > 0 ? (
          <table className="case-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Title</th>
                <th>Complaint Type</th>
                <th>City</th>
                <th>Status</th>
                <th>Edit Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span
                      className="case-id-link"
                      onClick={() => goToCaseDetails(c.complaintId)}
                      style={{ color: "#0d6efd", cursor: "pointer" }}
                    >
                      {c.id}
                    </span>
                  </td>
                  <td>{c.title}</td>
                  <td>{c.complaintType}</td>
                  <td>{c.city}</td>
                  <td>
                    <span
                      className={`case-status-badge bg-${getStatusColor(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="status-filter-select"
                      value={c.status}
                      onChange={(e) =>
                        handleStatusChange(c.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Investigating">Investigating</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No cases assigned to you with the selected status.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "secondary";
    case "Investigating":
      return "warning";
    case "Resolved":
      return "success";
    case "Rejected":
      return "danger";
    default:
      return "light";
  }
};

const capitalize = (str) =>
  str && str.length > 0
    ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    : "";

export default OfficerHome;
