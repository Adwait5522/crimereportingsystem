import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../styles/FeedBackComplaints.css"; // Custom CSS for styling

const FeedBackComplaints = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch unseen feedbacks from the backend
  const fetchUnseenFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/feedBack/unseen-feedback");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  // Handle marking feedback as read
  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/feedBack/${id}`);
      alert("Feedback marked as read!");
      fetchUnseenFeedbacks(); // Refresh the feedback list
    } catch (err) {
      console.error("Error updating feedback status:", err);
      alert("Failed to mark as read.");
    }
  };

  // Fetch feedbacks on component mount
  useEffect(() => {
    fetchUnseenFeedbacks();
  }, []);

  return (
    <>
      <Header />
      <div className="feedback-container">
        <h2 className="title">Unseen Feedback Complaints</h2>
        <div className="table-wrapper">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>User ID</th>
                <th>Rating</th>
                <th>Comments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">No unseen feedbacks available</td>
                </tr>
              ) : (
                feedbacks.map((fb) => (
                  <tr key={fb.feedBackId}>
                    <td>{fb.complaintId}</td>
                    <td>{fb.userId}</td>
                    <td>{fb.rating}</td>
                    <td>{fb.comments}</td>
                    <td>
                      <button
                        className="btn-mark-read"
                        onClick={() => handleMarkAsRead(fb.feedBackId)}
                      >
                        Mark as Read
                      </button>
                    </td>
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
};

export default FeedBackComplaints;
