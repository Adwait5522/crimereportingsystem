// // import React, { useState } from 'react';
// // import Footer from '../Components/Footer';
// // import Header from '../Components/Header';
// // import '../styles/ComplaintPage.css';

// // const ComplaintPage = () => {
// //   const [filter, setFilter] = useState('all');

// //   const complaints = [
// //     { id: 1, title: 'Internet Fraud', status: 'open' },
// //     { id: 2, title: 'Cyberbullying', status: 'closed' },
// //     { id: 3, title: 'Phishing Attempt', status: 'in progress' },
// //     { id: 4, title: 'Data Breach', status: 'resolved' },
// //     { id: 5, title: 'Harassment', status: 'under scrutiny' },
// //   ];

// //   const filteredComplaints =
// //     filter === 'all'
// //       ? complaints
// //       : complaints.filter((complaint) => complaint.status === filter);

// //   const isActionDisabled = (status) => {
// //     return (
// //       status === 'resolved' ||
// //       status === 'closed' ||
// //       status === 'under scrutiny'
// //     );
// //   };

// //   return (
// //     <>
// //       <Header />
// //       <div className="page-layout">
// //         <div className="page-container">
// //           <h2>View and manage your complaints.</h2>

// //           <select
// //             onChange={(e) => setFilter(e.target.value)}
// //             value={filter}
// //             className="filter-dropdown"
// //           >
// //             <option value="all">All</option>
// //             <option value="open">Open</option>
// //             <option value="in progress">In Progress</option>
// //             <option value="under scrutiny">Under Scrutiny</option>
// //             <option value="resolved">Resolved</option>
// //             <option value="closed">Closed</option>
// //           </select>

// //           <table className="complaints-table">
// //             <thead>
// //               <tr>
// //                 <th>ID</th>
// //                 <th>Title</th>
// //                 <th>Status</th>
// //                 <th>Actions</th>
// //                 <th>Feedback</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredComplaints.map((complaint) => (
// //                 <tr key={complaint.id}>
// //                   <td>{complaint.id}</td>
// //                   <td>{complaint.title}</td>
// //                   <td>{complaint.status}</td>
// //                   <td>
// //                     <button
// //                       className="action-btn"
// //                       disabled={isActionDisabled(complaint.status)}
// //                     >
// //                       Update
// //                     </button>
// //                     <button
// //                       className="action-btn"
// //                       disabled={isActionDisabled(complaint.status)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                   <td>
// //                     {(complaint.status === 'closed' ||
// //                       complaint.status === 'resolved') ? (
// //                       <button className="feedback-btn">Feedback</button>
// //                     ) : (
// //                       <div className="empty-feedback-slot"></div>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default ComplaintPage;







// // import React, { useEffect, useState } from 'react';
// // import Footer from '../Components/Footer';
// // import Header from '../Components/Header';
// // import '../styles/ComplaintPage.css';
// // import axios from 'axios';

// // const ComplaintPage = () => {
// //   const [filter, setFilter] = useState('all');
// //   const [complaints, setComplaints] = useState([]);

// //   useEffect(() => {
// //     fetchComplaints();
// //   }, []);

// //   const fetchComplaints = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:8080/complaints/all'); // Replace with your actual GET endpoint
// //       setComplaints(response.data);
// //     } catch (error) {
// //       console.error('Error fetching complaints:', error);
// //     }
// //   };

// //   const filteredComplaints =
// //     filter === 'all'
// //       ? complaints
// //       : complaints.filter((c) => c.status === filter.toUpperCase());

// //   const isActionDisabled = (status) =>
// //     ['RESOLVED', 'CLOSED', 'UNDER SCRUTINY'].includes(status.toUpperCase());

// //   const handleStatusUpdate = async (id, newStatus) => {
// //     try {
// //       await axios.put(`http://localhost:8080/complaints/${id}/status`, {
// //         status: newStatus,
// //       });
// //       alert(`Complaint ${id} status updated to ${newStatus}`);
// //       fetchComplaints(); // Refresh list
// //     } catch (error) {
// //       console.error('Status update failed:', error);
// //       alert('Error updating status');
// //     }
// //   };

// //   return (
// //     <>
// //       <Header />
// //       <div className="page-layout">
// //         <div className="page-container">
// //           <h2>View and manage your complaints.</h2>

// //           <select
// //             onChange={(e) => setFilter(e.target.value)}
// //             value={filter}
// //             className="filter-dropdown"
// //           >
// //             <option value="all">All</option>
// //             <option value="PENDING">Pending</option>
// //             <option value="INVESTIGATING">Investigating</option>
// //             <option value="RESOLVED">Resolved</option>
// //             <option value="REJECTED">Rejected</option>
// //           </select>

// //           <table className="complaints-table">
// //             <thead>
// //               <tr>
// //                 <th>ID</th>
// //                 <th>Type</th>
// //                 <th>Description</th>
// //                 <th>Status</th>
// //                 <th>Update</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredComplaints.map((complaint) => (
// //                 <tr key={complaint.complaintId}>
// //                   <td>{complaint.complaintId}</td>
// //                   <td>{complaint.complaintType}</td>
// //                   <td>{complaint.description}</td>
// //                   <td>{complaint.status}</td>
// //                   <td>
// //                     {!isActionDisabled(complaint.status) && (
// //                       <>
// //                         <select
// //                           onChange={(e) =>
// //                             handleStatusUpdate(complaint.complaintId, e.target.value)
// //                           }
// //                           defaultValue=""
// //                         >
// //                           <option value="" disabled>
// //                             Change Status
// //                           </option>
// //                           <option value="PENDING">Pending</option>
// //                           <option value="INVESTIGATING">Investigating</option>
// //                           <option value="RESOLVED">Resolved</option>
// //                           <option value="REJECTED">Rejected</option>
// //                         </select>
// //                       </>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default ComplaintPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Footer from '../Components/Footer';
// import Header from '../Components/Header';
// import '../styles/ComplaintPage.css';

// const ComplaintPage = () => {
//   const [filter, setFilter] = useState('ALL');
//   const [complaints, setComplaints] = useState([]);

//   // Fetch all complaints from backend
//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/complaints/all');
//         setComplaints(response.data);
//       } catch (error) {
//         console.error('Error fetching complaints:', error);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   // Filter logic
//   const filteredComplaints =
//     filter === 'ALL'
//       ? complaints
//       : complaints.filter(
//           (complaint) => complaint.status.toUpperCase() === filter
//         );

//   const isActionDisabled = (status) =>
//     status === 'RESOLVED' || status === 'REJECTED';

//   return (
//     <>
//       <Header />
//       <div className="page-layout">
//         <div className="page-container">
//           <h2>View and manage your complaints</h2>

//           <select
//             onChange={(e) => setFilter(e.target.value)}
//             value={filter}
//             className="filter-dropdown"
//           >
//             <option value="ALL">All</option>
//             <option value="PENDING">Pending</option>
//             <option value="INVESTIGATING">Investigating</option>
//             <option value="RESOLVED">Resolved</option>
//             <option value="REJECTED">Rejected</option>
//           </select>

//           <table className="complaints-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Complaint Type</th>
//                 <th>Description</th>
//                 <th>City</th>
//                 <th>State</th>
//                 <th>Status</th>
//                 <th>Priority</th>
//                 <th>Actions</th>
//                 <th>Feedback</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredComplaints.map((complaint) => (
//                 <tr key={complaint.complaintId}>
//                   <td>{complaint.complaintId}</td>
//                   <td>{complaint.complaintType}</td>
//                   <td>{complaint.description}</td>
//                   <td>{complaint.city}</td>
//                   <td>{complaint.state}</td>
//                   <td>{complaint.status}</td>
//                   <td>{complaint.priority}</td>
//                   <td>
//                     <button
//                       className="action-btn"
//                       disabled={isActionDisabled(complaint.status)}
//                     >
//                       Update
//                     </button>
//                     <button
//                       className="action-btn"
//                       disabled={isActionDisabled(complaint.status)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                   <td>
//                     {(complaint.status === 'RESOLVED' ||
//                       complaint.status === 'REJECTED') ? (
//                       <button className="feedback-btn">Feedback</button>
//                     ) : (
//                       <div className="empty-feedback-slot"></div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ComplaintPage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Footer from '../Components/Footer';
// import Header from '../Components/Header';
// import '../styles/ComplaintPage.css';

// const ComplaintPage = () => {
//   const [filter, setFilter] = useState('ALL');
//   const [complaints, setComplaints] = useState([]);

//   // Fetch all complaints from backend
//   const fetchComplaints = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/complaints/all');
//       setComplaints(response.data);
//     } catch (error) {
//       console.error('Error fetching complaints:', error);
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   // Filter logic
//   const filteredComplaints =
//     filter === 'ALL'
//       ? complaints
//       : complaints.filter(
//           (complaint) => complaint.status.toUpperCase() === filter
//         );

//   const isActionDisabled = (status) =>
//     status === 'RESOLVED' || status === 'REJECTED';

//   // Delete complaint
//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Are you sure you want to delete this complaint?");
//     if (!confirm) return;

//     try {
//       await axios.delete(`http://localhost:8080/complaints/${id}`);
//       alert("Complaint deleted successfully.");
//       fetchComplaints(); // refresh
//     } catch (error) {
//       alert("Error deleting complaint.");
//       console.error(error);
//     }
//   };

//   // Update complaint status
//   const handleStatusUpdate = async (id, newStatus) => {
//     try {
//       await axios.put(`http://localhost:8080/complaints/${id}/status`, {
//         status: newStatus,
//       });
//       alert(`Status updated to ${newStatus}`);
//       fetchComplaints();
//     } catch (error) {
//       console.error('Status update failed:', error);
//       alert("Failed to update status.");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="page-layout">
//         <div className="page-container">
//           <h2>View and manage your complaints</h2>

//           <select
//             onChange={(e) => setFilter(e.target.value)}
//             value={filter}
//             className="filter-dropdown"
//           >
//             <option value="ALL">All</option>
//             <option value="PENDING">Pending</option>
//             <option value="INVESTIGATING">Investigating</option>
//             <option value="RESOLVED">Resolved</option>
//             <option value="REJECTED">Rejected</option>
//           </select>

//           <table className="complaints-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Complaint Type</th>
//                 <th>Description</th>
//                 <th>City</th>
//                 <th>State</th>
//                 <th>Status</th>
//                 <th>Priority</th>
//                 <th>Actions</th>
//                 <th>Feedback</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredComplaints.map((complaint) => (
//                 <tr key={complaint.complaintId}>
//                   <td>{complaint.complaintId}</td>
//                   <td>{complaint.complaintType}</td>
//                   <td>{complaint.description}</td>
//                   <td>{complaint.city}</td>
//                   <td>{complaint.state}</td>
//                   <td>{complaint.status}</td>
//                   <td>{complaint.priority}</td>
//                   <td>
//                     {!isActionDisabled(complaint.status) && (
//                       <select
//                         onChange={(e) =>
//                           handleStatusUpdate(complaint.complaintId, e.target.value)
//                         }
//                         defaultValue=""
//                       >
//                         <option value="" disabled>Change Status</option>
//                         <option value="PENDING">Pending</option>
//                         <option value="INVESTIGATING">Investigating</option>
//                         <option value="RESOLVED">Resolved</option>
//                         <option value="REJECTED">Rejected</option>
//                       </select>
//                     )}
//                     <br />
//                     <button
//                       className="action-btn"
//                       disabled={isActionDisabled(complaint.status)}
//                       onClick={() => handleDelete(complaint.complaintId)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                   <td>
//                     {(complaint.status === 'RESOLVED' || complaint.status === 'REJECTED') ? (
//                       <button className="feedback-btn">Feedback</button>
//                     ) : (
//                       <div className="empty-feedback-slot"></div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//               {filteredComplaints.length === 0 && (
//                 <tr>
//                   <td colSpan="9" style={{ textAlign: 'center' }}>No complaints found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ComplaintPage;





// Geolocation integration

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../styles/ComplaintPage.css';

const ComplaintPage = () => {
  const [filter, setFilter] = useState('ALL');
  const [complaints, setComplaints] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationError, setLocationError] = useState('');

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:8080/complaints/all');
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  // Fetch geolocation on mount
  useEffect(() => {
    fetchComplaints();

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError('Location access denied or unavailable.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  }, []);

  // Filter complaints
  const filteredComplaints =
    filter === 'ALL'
      ? complaints
      : complaints.filter((complaint) => complaint.status.toUpperCase() === filter);

  const isActionDisabled = (status) =>
    status === 'RESOLVED' || status === 'REJECTED';

  // Delete complaint
  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this complaint?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/complaints/${id}`);
      alert('Complaint deleted successfully.');
      fetchComplaints();
    } catch (error) {
      alert('Error deleting complaint.');
      console.error(error);
    }
  };

  // Update complaint status
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/complaints/${id}/status`, {
        status: newStatus,
      });
      alert(`Status updated to ${newStatus}`);
      fetchComplaints();
    } catch (error) {
      console.error('Status update failed:', error);
      alert('Failed to update status.');
    }
  };

  return (
    <>
      <Header />
      <div className="page-layout">
        <div className="page-container">
          <h2>View and manage your complaints</h2>

          {/* Geolocation display */}
          <div className="location-info" style={{ marginBottom: '10px' }}>
            {location.latitude && location.longitude ? (
              <p>
                Your current location:<br />
                <strong>Latitude:</strong> {location.latitude.toFixed(4)} &nbsp;
                <strong>Longitude:</strong> {location.longitude.toFixed(4)}
              </p>
            ) : (
              <p style={{ color: 'red' }}>{locationError}</p>
            )}
          </div>

          {/* Filter dropdown */}
          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="filter-dropdown"
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="INVESTIGATING">Investigating</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {/* Complaint Table */}
          <table className="complaints-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Complaint Type</th>
                <th>Description</th>
                <th>City</th>
                <th>State</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.complaintId}>
                  <td>{complaint.complaintId}</td>
                  <td>{complaint.complaintType}</td>
                  <td>{complaint.description}</td>
                  <td>{complaint.city}</td>
                  <td>{complaint.state}</td>
                  <td>{complaint.status}</td>
                  <td>{complaint.priority}</td>
                  <td>
                    {!isActionDisabled(complaint.status) && (
                      <select
                        onChange={(e) =>
                          handleStatusUpdate(complaint.complaintId, e.target.value)
                        }
                        defaultValue=""
                      >
                        <option value="" disabled>Change Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="INVESTIGATING">Investigating</option>
                        <option value="RESOLVED">Resolved</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                    )}
                    <br />
                    <button
                      className="action-btn"
                      disabled={isActionDisabled(complaint.status)}
                      onClick={() => handleDelete(complaint.complaintId)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {(complaint.status === 'RESOLVED' || complaint.status === 'REJECTED') ? (
                      <button className="feedback-btn">Feedback</button>
                    ) : (
                      <div className="empty-feedback-slot"></div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredComplaints.length === 0 && (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ComplaintPage;
