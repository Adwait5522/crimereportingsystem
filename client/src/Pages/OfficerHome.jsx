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
  const [editValues, setEditValues] = useState({}); // complaintId -> { status, priority }
  const [loadingMap, setLoadingMap] = useState({}); // complaintId -> loading state

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
          status: item.status.toUpperCase(),
          priority: item.priority.toUpperCase(),
        }));

        // Set cases
        setCases(complaints);

        // Prepare editable values
        const initEdit = {};
        complaints.forEach((c) => {
          initEdit[c.complaintId] = {
            status: c.status,
            priority: c.priority,
          };
        });
        setEditValues(initEdit);
      })
      .catch((err) => console.error("Error fetching complaints:", err));
  }, [loggedInOfficerId]);

  useEffect(() => {
    let officerCases = [...cases];
    if (statusFilter !== "All") {
      officerCases = officerCases.filter(
        (c) => c.status === statusFilter.toUpperCase()
      );
    }
    setFilteredCases(officerCases);
  }, [cases, statusFilter]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/officer-login");
  };

  const goToCaseDetails = (complaintId) => {
    navigate(`/case/${complaintId}`);
  };

  const handleChange = (complaintId, field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [complaintId]: { ...prev[complaintId], [field]: value },
    }));
  };

  const handleSubmit = async (complaintId) => {
    const edit = editValues[complaintId];
    if (!edit) {
      alert("Nothing to submit.");
      return;
    }

    const newStatus = edit.status.toUpperCase();
    const newPriority = edit.priority.toUpperCase();
    const idInt = Number(complaintId);

    setLoadingMap((prev) => ({ ...prev, [complaintId]: true }));

    try {
      // Change status
      await axios.put(`http://localhost:8080/complaints/change-status`, {
        complaintId: idInt,
        status: newStatus,
      });

      // Change priority
      await axios.put(`http://localhost:8080/complaints/change-priority`, {
        complaintId: idInt,
        priority: newPriority,
      });

      // Update UI immediately
      setCases((prev) =>
        prev.map((c) =>
          c.complaintId === complaintId
            ? { ...c, status: newStatus, priority: newPriority }
            : c
        )
      );

      alert(`Complaint ${complaintId} updated successfully.`);
    } catch (error) {
      console.error("Error updating complaint:", error);
      alert(`Failed to update complaint ${complaintId}.`);
    } finally {
      setLoadingMap((prev) => ({ ...prev, [complaintId]: false }));
    }
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
            <option value="PENDING">Pending</option>
            <option value="INVESTIGATING">Investigating</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
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
                <th>Priority</th>
                <th>Change Status</th>
                <th>Change Priority</th>
                <th>Submit</th>
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
                  <td>{c.status}</td>
                  <td>{c.priority}</td>

                  {/* Change Status dropdown */}
                  <td>
                    <select
                      className="status-filter-select"
                      value={editValues[c.complaintId]?.status || c.status}
                      onChange={(e) =>
                        handleChange(c.complaintId, "status", e.target.value)
                      }
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="INVESTIGATING">INVESTIGATING</option>
                      <option value="RESOLVED">RESOLVED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </td>

                  {/* Change Priority dropdown */}
                  <td>
                    <select
                      className="status-filter-select"
                      value={editValues[c.complaintId]?.priority || c.priority}
                      onChange={(e) =>
                        handleChange(c.complaintId, "priority", e.target.value)
                      }
                    >
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                    </select>
                  </td>

                  {/* Submit button */}
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSubmit(c.complaintId)}
                      disabled={loadingMap[c.complaintId]}
                    >
                      {loadingMap[c.complaintId] ? "Saving..." : "Submit"}
                    </button>
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

export default OfficerHome;
