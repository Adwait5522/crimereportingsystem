import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OfficerHome = () => {
  const navigate = useNavigate();

  // Simulated login - in production, get this from auth context or localStorage
  const loggedInOfficerName = localStorage.getItem("officerName") || "Officer Tiwari";

  const [statusFilter, setStatusFilter] = useState("All");

  const [cases, setCases] = useState([
    {
      id: "C001",
      title: "Robbery at Mall",
      status: "Pending",
      station: "Station A",
      officer: "Officer Sharma",
    },
    {
      id: "C002",
      title: "Cyber Fraud",
      status: "Investigating",
      station: "Cyber Cell",
      officer: "Officer Tiwari",
    },
    {
      id: "C003",
      title: "Hit and Run",
      status: "Resolved",
      station: "Station B",
      officer: "Officer Tiwari",
    },
    {
      id: "C004",
      title: "Chain Snatching",
      status: "Rejected",
      station: "Station A",
      officer: "Officer Sharma",
    },
  ]);

  const [filteredCases, setFilteredCases] = useState([]);

  useEffect(() => {
    // Filter by logged-in officer
    let officerCases = cases.filter((c) => c.officer === loggedInOfficerName);

    // Apply status filter
    if (statusFilter !== "All") {
      officerCases = officerCases.filter((c) => c.status === statusFilter);
    }

    setFilteredCases(officerCases);
  }, [cases, statusFilter, loggedInOfficerName]);

  const handleStatusChange = (caseId, newStatus) => {
    setCases((prevCases) =>
      prevCases.map((c) =>
        c.id === caseId ? { ...c, status: newStatus } : c
      )
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/officer-login");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Welcome, {loggedInOfficerName}</h3>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Filter by Status:</label>
        <select
          className="form-select w-auto d-inline-block ms-2"
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
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Case ID</th>
              <th>Title</th>
              <th>Station</th>
              <th>Status</th>
              <th>Edit Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((c) => (
              <tr key={c.id}>
                <td>
                  <a
                    href={`/case/${c.id}`}
                    className="text-primary text-decoration-underline"
                  >
                    {c.id}
                  </a>
                </td>
                <td>{c.title}</td>
                <td>{c.station}</td>
                <td>
                  <span className={`badge bg-${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <select
                    className="form-select"
                    value={c.status}
                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
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

export default OfficerHome;
