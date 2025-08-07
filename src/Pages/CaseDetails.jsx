import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import axios from "axios";

const CaseDetails = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/complaints/${caseId}`)
      .then((res) => {
        setCaseData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching case details:", err);
        setError("Failed to load case details.");
      });
  }, [caseId]);

  if (error) {
    return (
      <div className="container py-4">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <h3>{error}</h3>
        <Footer />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="container py-4">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <h3>Loading case details...</h3>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="container py-4">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <h3>Case Details</h3>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Case ID</th>
              <td>{caseData.complaintId}</td>
            </tr>
            <tr>
              <th>Complaint Type</th>
              <td>{caseData.complaintType}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{caseData.description}</td>
            </tr>
            <tr>
              <th>Station</th>
              <td>{caseData.city}</td>
            </tr>
            <tr>
              <th>Investigating Officer</th>
              <td>{caseData.state}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{caseData.status}</td>
            </tr>
            <tr>
              <th>Priority</th>
              <td>{caseData.priority}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default CaseDetails;
