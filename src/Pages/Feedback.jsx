// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
// import "../styles/HeadquarterLogin.css"; // Reusing same CSS

// function FeedbackForm() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const userId = location.state?.userId;
//   const complaintId = location.state?.complaintId;

//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState("");
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!comment.trim()) newErrors.comment = "Comment is required.";
//     if (!rating || rating < 1 || rating > 5)
//       newErrors.rating = "Rating must be between 1 and 5.";
//     if (!complaintId || isNaN(complaintId))
//       newErrors.complaintId = "Complaint ID must be a valid number.";
//     if (!userId || isNaN(userId))
//       newErrors.userId = "User ID must be a valid number.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const feedbackData = {
//         comment,
//         rating: parseInt(rating)
//       };

//       try {
//         const response = await fetch(
//           `http://localhost:8080/feedback/user_login/${userId}/complaint/${complaintId}`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(feedbackData),
//           }
//         );

//         if (response.ok) {
//           alert("Feedback submitted successfully!");
//           navigate("/complaints"); // Redirect to complaints page
//         } else {
//           alert("Failed to submit feedback.");
//         }
//       } catch (error) {
//         console.error("Error submitting feedback:", error);
//         alert("An error occurred. Please try again later.");
//       }
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="hq-login-container">
//         <div className="hq-login-card">
//           <h3>Submit Feedback</h3>
//           <form onSubmit={handleSubmit} noValidate>
//             {/* Complaint ID (Read-only) */}
//             <div className="form-group">
//               <label htmlFor="complaintId">Complaint ID</label>
//               <input
//                 disabled
//                 type="number"
//                 id="complaintId"
//                 className={`form-control ${
//                   errors.complaintId ? "is-invalid" : ""
//                 }`}
//                 value={complaintId}
//               />
//               {errors.complaintId && (
//                 <div className="invalid-feedback">{errors.complaintId}</div>
//               )}
//             </div>

//             {/* Rating */}
//             <div className="form-group">
//               <label htmlFor="rating">Rating (1 to 5)</label>
//               <input
//                 type="number"
//                 id="rating"
//                 className={`form-control ${errors.rating ? "is-invalid" : ""}`}
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//                 min="1"
//                 max="5"
//                 placeholder="Enter rating"
//               />
//               {errors.rating && (
//                 <div className="invalid-feedback">{errors.rating}</div>
//               )}
//             </div>

//             {/* Comment */}
//             <div className="form-group">
//               <label htmlFor="comment">Comment</label>
//               <textarea
//                 id="comment"
//                 className={`form-control ${errors.comment ? "is-invalid" : ""}`}
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 rows="3"
//                 placeholder="Write your feedback..."
//               ></textarea>
//               {errors.comment && (
//                 <div className="invalid-feedback">{errors.comment}</div>
//               )}
//             </div>

//             <button type="submit" className="login-btn">
//               Submit Feedback
//             </button>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default FeedbackForm;



// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
// import "../styles/HeadquarterLogin.css"; // Reusing same CSS

// function FeedbackForm() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Fetch dynamic values passed from previous page
//   const userId = location.state?.userId;
//   const complaintId = location.state?.complaintId;

//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState("");
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!comment.trim()) newErrors.comment = "Comment is required.";
//     if (!rating || rating < 1 || rating > 5)
//       newErrors.rating = "Rating must be between 1 and 5.";
//     if (!complaintId || isNaN(complaintId))
//       newErrors.complaintId = "Invalid Complaint ID.";
//     if (!userId || isNaN(userId))
//       newErrors.userId = "Invalid User ID.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const response = await fetch(
//         `http://localhost:8080/feedback/user_login/${userId}/complaint/${complaintId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             comment: comment.trim(),
//             rating: parseInt(rating),
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to submit feedback");
//       }

//       alert("Feedback submitted successfully!");

//       // Redirect to complaints page
//       navigate("/complaints");
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//       alert("Failed to submit feedback. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="hq-login-container">
//         <div className="hq-login-card">
//           <h3>Submit Feedback</h3>
//           <form onSubmit={handleSubmit} noValidate>
//             {/* Complaint ID (disabled) */}
//             <div className="form-group">
//               <label htmlFor="complaintId">Complaint ID</label>
//               <input
//                 disabled
//                 type="number"
//                 id="complaintId"
//                 className="form-control"
//                 value={complaintId}
//               />
//               {errors.complaintId && (
//                 <div className="invalid-feedback">{errors.complaintId}</div>
//               )}
//             </div>

//             {/* Rating */}
//             <div className="form-group">
//               <label htmlFor="rating">Rating (1 to 5)</label>
//               <input
//                 type="number"
//                 id="rating"
//                 className={`form-control ${errors.rating ? "is-invalid" : ""}`}
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//                 min="1"
//                 max="5"
//                 placeholder="Enter rating"
//               />
//               {errors.rating && (
//                 <div className="invalid-feedback">{errors.rating}</div>
//               )}
//             </div>

//             {/* Comment */}
//             <div className="form-group">
//               <label htmlFor="comment">Comment</label>
//               <textarea
//                 id="comment"
//                 className={`form-control ${errors.comment ? "is-invalid" : ""}`}
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 rows="3"
//                 placeholder="Write your feedback..."
//               ></textarea>
//               {errors.comment && (
//                 <div className="invalid-feedback">{errors.comment}</div>
//               )}
//             </div>

//             <button type="submit" className="login-btn">
//               Submit Feedback
//             </button>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default FeedbackForm;

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







