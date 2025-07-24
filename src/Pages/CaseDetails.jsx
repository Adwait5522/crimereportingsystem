import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const CaseDetails = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();

  // TODO: Replace with API call
  const caseData = {
    id: caseId,
    title: "Robbery at Mall",
    description: "A robbery was reported at City Mall.",
    station: "Station A",
    officer: "Officer Sharma",
    status: "Pending",
    date: "2025-07-20",
  };

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
              <td>{caseData.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{caseData.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{caseData.description}</td>
            </tr>
            <tr>
              <th>Station</th>
              <td>{caseData.station}</td>
            </tr>
            <tr>
              <th>Investigating Officer</th>
              <td>{caseData.officer}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{caseData.status}</td>
            </tr>
            <tr>
              <th>Date Reported</th>
              <td>{caseData.date}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default CaseDetails;
