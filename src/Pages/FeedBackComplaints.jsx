// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
// import "../styles/FeedBackComplaints.css"; // Custom CSS for styling

// const FeedBackComplaints = () => {
//   const [feedbacks, setFeedbacks] = useState([]);

//   // Fetch unseen feedbacks from the backend
//   const fetchUnseenFeedbacks = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/feedBack/unseen-feedback");
//       setFeedbacks(res.data);
//     } catch (err) {
//       console.error("Error fetching feedback:", err);
//     }
//   };

//   // Handle marking feedback as read
//   const handleMarkAsRead = async (id) => {
//     try {
//       await axios.patch(`http://localhost:8080/feedBack/${id}`);
//       alert("Feedback marked as read!");
//       fetchUnseenFeedbacks(); // Refresh the feedback list
//     } catch (err) {
//       console.error("Error updating feedback status:", err);
//       alert("Failed to mark as read.");
//     }
//   };

//   // Fetch feedbacks on component mount
//   useEffect(() => {
//     fetchUnseenFeedbacks();
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className="feedback-container">
//         <h2 className="title">Unseen Feedback Complaints</h2>
//         <div className="table-wrapper">
//           <table className="feedback-table">
//             <thead>
//               <tr>
//                 <th>Complaint ID</th>
//                 <th>User ID</th>
//                 <th>Rating</th>
//                 <th>Comments</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {feedbacks.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="no-data">No unseen feedbacks available</td>
//                 </tr>
//               ) : (
//                 feedbacks.map((fb) => (
//                   <tr key={fb.feedBackId}>
//                     <td>{fb.complaintId}</td>
//                     <td>{fb.userId}</td>
//                     <td>{fb.rating}</td>
//                     <td>{fb.comments}</td>
//                     <td>
//                       <button
//                         className="btn-mark-read"
//                         onClick={() => handleMarkAsRead(fb.feedBackId)}
//                       >
//                         Mark as Read
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default FeedBackComplaints;


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import "../styles/HeadquarterLogin.css"; // Keep the original CSS

function FeedbackForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId;
  const prefilledComplaintId = location.state?.complaintId || "";

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [complaintId, setComplaintId] = useState(prefilledComplaintId);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!comment.trim()) newErrors.comment = "Comment is required.";
    if (!rating || rating < 1 || rating > 5)
      newErrors.rating = "Rating must be between 1 and 5.";
    if (!complaintId || isNaN(complaintId))
      newErrors.complaintId = "Complaint ID must be a valid number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(
        `http://localhost:8080/feedback/user_login/${userId}/complaint/${complaintId}`,
        {
          comment,
          rating: parseInt(rating),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Feedback submitted successfully.");
      navigate("/complaints"); 
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="hq-login-container">
        <div className="hq-login-card">
          <h3>Submit Feedback</h3>
          <form onSubmit={handleSubmit} noValidate>
            {/* Complaint ID */}
            <div className="form-group">
              <label htmlFor="complaintId">Complaint ID</label>
              <input
                disabled
                type="number"
                id="complaintId"
                className={`form-control ${
                  errors.complaintId ? "is-invalid" : ""
                }`}
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
              />
              {errors.complaintId && (
                <div className="invalid-feedback">{errors.complaintId}</div>
              )}
            </div>

            {/* Rating */}
            <div className="form-group">
              <label htmlFor="rating">Rating (1 to 5)</label>
              <input
                type="number"
                id="rating"
                className={`form-control ${errors.rating ? "is-invalid" : ""}`}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                placeholder="Enter rating"
              />
              {errors.rating && (
                <div className="invalid-feedback">{errors.rating}</div>
              )}
            </div>

            {/* Comment */}
            <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                className={`form-control ${errors.comment ? "is-invalid" : ""}`}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="3"
                placeholder="Write your feedback..."
              ></textarea>
              {errors.comment && (
                <div className="invalid-feedback">{errors.comment}</div>
              )}
            </div>

            <button type="submit" className="login-btn">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FeedbackForm;