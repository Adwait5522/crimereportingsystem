// import React, { useState, useEffect } from 'react';
// import Footer from '../Components/Footer';
// import Header from '../Components/Header';
// import '../styles/ComplaintPage.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ComplaintPage = () => {
//   const [complaints, setComplaints] = useState([]);
//   const navigate = useNavigate();

//   // Fetch complaints for logged-in user
//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId');
//     if (!storedUserId) {
//       console.error("No userId found in localStorage. Redirecting to login.");
//       navigate('/user_login');
//       return;
//     }

//     axios.get(`http://localhost:8080/complaints/user/${storedUserId}`)
//       .then(response => setComplaints(response.data))
//       .catch(error => console.error('Error fetching complaints:', error));
//   }, [navigate]);

//   // Delete complaint
//   const handleDelete = (complaintId) => {
//     axios.delete(`http://localhost:8080/complaints/${complaintId}`)
//       .then(() => {
//         setComplaints(prev => prev.filter(c => c.complaintId !== complaintId));
//       })
//       .catch(error => {
//         console.error('Error deleting complaint:', error);
//       });
//   };

//   // Navigate to feedback page
//   const handleFeedback = (complaintId, userId) => {
//     navigate(`/feedback`);
//   };

//   return (
//     <div>
//       <Header />

//       <div className="complaint-page-container">
//         <h2>Your Complaints</h2>

//         <div className="add-complaint-container">
//           <button
//             className="add-complaint-btn"
//             onClick={() => navigate('/file-complaint')}
//           >
//             Add Complaint
//           </button>
//         </div>

//         <table className="complaint-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Type</th>
//               <th>Description</th>
//               <th>Pincode</th>
//               <th>City</th>
//               <th>State</th>
//               <th>Status</th>
//               <th>Actions</th>
//               <th>Feedback</th>
//             </tr>
//           </thead>
//           <tbody>
//             {complaints.length > 0 ? (
//               complaints.map((complaint) => (
//                 <tr key={complaint.complaintId}>
//                   <td>{complaint.complaintId}</td>
//                   <td>{complaint.complaintType}</td>
//                   <td>{complaint.description}</td>
//                   <td>{complaint.locationPincode}</td>
//                   <td>{complaint.city}</td>
//                   <td>{complaint.state}</td>
//                   <td>{complaint.status}</td>
//                   <td>
//                     <button
//                       className="action-btn"
//                       onClick={() => handleDelete(complaint.complaintId)}
//                       disabled={
//                         complaint.status === 'RESOLVED' ||
//                         complaint.status === 'REJECTED'
//                       }
//                     >
//                       Delete
//                     </button>
//                   </td>
//                   <td>
//                     {(complaint.status === 'RESOLVED' || complaint.status === 'REJECTED') ? (
//                       <button
//                         className="feedback-btn"
//                         onClick={() => handleFeedback(complaint.complaintId, complaint.userId)}
//                       >
//                         Feedback
//                       </button>
//                     ) : (
//                       <div className="empty-feedback-slot"></div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" style={{ textAlign: 'center' }}>No complaints found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ComplaintPage;



// import React, { useState, useEffect } from 'react';
// import Footer from '../Components/Footer';
// import Header from '../Components/Header';
// import '../styles/ComplaintPage.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ComplaintPage = () => {
//   const [complaints, setComplaints] = useState([]);
//   const navigate = useNavigate();

//   // Fetch complaints for logged-in user
//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId');
//     if (!storedUserId) {
//       console.error("No userId found in localStorage. Redirecting to login.");
//       navigate('/user_login');
//       return;
//     }

//     axios
//       .get(`http://localhost:8080/complaints/user/${storedUserId}`)
//       .then(response => {
//         // Filter out complaints with DELETED status
//         const activeComplaints = response.data.filter(
//           c => c.status && c.status.toUpperCase() !== 'DELETED'
//         );
//         setComplaints(activeComplaints);
//       })
//       .catch(error => console.error('Error fetching complaints:', error));
//   }, [navigate]);

//   // Delete complaint (soft delete)
//   const handleDelete = (complaintId) => {
//     axios
//       .delete(`http://localhost:8080/complaints/${complaintId}`)
//       .then(() => {
//         // Immediately remove deleted complaint from UI
//         setComplaints(prev =>
//           prev.filter(c => c.complaintId !== complaintId)
//         );
//       })
//       .catch(error => {
//         console.error('Error deleting complaint:', error);
//       });
//   };

//   // Navigate to feedback page
//   const handleFeedback = (complaintId, userId) => {
//     navigate(`/feedback`);
//   };

//   return (
//     <div>
//       <Header />

//       <div className="complaint-page-container">
//         <h2>Your Complaints</h2>

//         <div className="add-complaint-container">
//           <button
//             className="add-complaint-btn"
//             onClick={() => navigate('/file-complaint')}
//           >
//             Add Complaint
//           </button>
//         </div>

//         <table className="complaint-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Type</th>
//               <th>Description</th>
//               <th>Pincode</th>
//               <th>City</th>
//               <th>State</th>
//               <th>Status</th>
//               <th>Actions</th>
//               <th>Feedback</th>
//             </tr>
//           </thead>
//           <tbody>
//             {complaints.length > 0 ? (
//               complaints.map((complaint) => (
//                 <tr key={complaint.complaintId}>
//                   <td>{complaint.complaintId}</td>
//                   <td>{complaint.complaintType}</td>
//                   <td>{complaint.description}</td>
//                   <td>{complaint.locationPincode}</td>
//                   <td>{complaint.city}</td>
//                   <td>{complaint.state}</td>
//                   <td>{complaint.status}</td>
//                   <td>
//                     <button
//                       className="action-btn"
//                       onClick={() => handleDelete(complaint.complaintId)}
//                       disabled={
//                         complaint.status === 'RESOLVED' ||
//                         complaint.status === 'REJECTED'
//                       }
//                     >
//                       Delete
//                     </button>
//                   </td>
//                   <td>
//                     {(complaint.status === 'RESOLVED' || complaint.status === 'REJECTED') ? (
//                       <button
//                         className="feedback-btn"
//                         onClick={() =>
//                           handleFeedback(complaint.complaintId, complaint.userId)
//                         }
//                       >
//                         Feedback
//                       </button>
//                     ) : (
//                       <div className="empty-feedback-slot"></div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" style={{ textAlign: 'center' }}>
//                   No complaints found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ComplaintPage;

import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../styles/ComplaintPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ComplaintPage = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  // Fetch complaints for logged-in user
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      console.error("No userId found in localStorage. Redirecting to login.");
      navigate('/user_login');
      return;
    }

    axios
      .get(`http://localhost:8080/complaints/user/${storedUserId}`)
      .then(response => {
        // Filter out complaints with DELETED status
        const activeComplaints = response.data.filter(
          c => c.status && c.status.toUpperCase() !== 'DELETED'
        );
        setComplaints(activeComplaints);
      })
      .catch(error => console.error('Error fetching complaints:', error));
  }, [navigate]);

  // Delete complaint (soft delete)
  const handleDelete = (complaintId) => {
    axios
      .delete(`http://localhost:8080/complaints/${complaintId}`)
      .then(() => {
        // Immediately remove deleted complaint from UI
        setComplaints(prev =>
          prev.filter(c => c.complaintId !== complaintId)
        );
      })
      .catch(error => {
        console.error('Error deleting complaint:', error);
      });
  };

  // Navigate to feedback page
  const handleFeedback = (complaintId, userId) => {
    navigate(`/feedback`, { state: { complaintId, userId } });
  };

  return (
    <div>
      <Header />

      <div className="complaint-page-container">
        <h2>Your Complaints</h2>

        <div className="add-complaint-container">
          <button
            className="add-complaint-btn"
            onClick={() => navigate('/file-complaint')}
          >
            Add Complaint
          </button>
        </div>

        <table className="complaint-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Pincode</th>
              <th>City</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <tr key={complaint.complaintId}>
                  <td>{complaint.complaintId}</td>
                  <td>{complaint.complaintType}</td>
                  <td>{complaint.description}</td>
                  <td>{complaint.locationPincode}</td>
                  <td>{complaint.city}</td>
                  <td>{complaint.state}</td>
                  <td>{complaint.status}</td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => handleDelete(complaint.complaintId)}
                      disabled={
                        complaint.status === 'RESOLVED' ||
                        complaint.status === 'REJECTED'
                      }
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {(complaint.status === 'RESOLVED' || complaint.status === 'REJECTED') ? (
                      <button
                        className="feedback-btn"
                        onClick={() =>
                          handleFeedback(complaint.complaintId, complaint.userId)
                        }
                      >
                        Feedback
                      </button>
                    ) : (
                      <div className="empty-feedback-slot"></div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center' }}>
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default ComplaintPage;