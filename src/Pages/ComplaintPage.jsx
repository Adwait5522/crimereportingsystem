// import React, { useState } from 'react';
// import Footer from '../Components/Footer';
// import Header from '../Components/Header';
// import '../styles/ComplaintPage.css';

// const ComplaintPage = () => {
//   const [filter, setFilter] = useState('all');

//   const complaints = [
//     { id: 1, title: 'Internet Fraud', status: 'open' },
//     { id: 2, title: 'Cyberbullying', status: 'closed' },
//     { id: 3, title: 'Phishing Attempt', status: 'in progress' },
//     { id: 4, title: 'Data Breach', status: 'resolved' },
//     { id: 5, title: 'Harassment', status: 'under scrutiny' },
//   ];

//   const filteredComplaints =
//     filter === 'all'
//       ? complaints
//       : complaints.filter((complaint) => complaint.status === filter);

//   const isActionDisabled = (status) => {
//     return (
//       status === 'resolved' ||
//       status === 'closed' ||
//       status === 'under scrutiny'
//     );
//   };

//   return (
//     <>
//       <Header />
//       <div className="page-layout">
//         <div className="page-container">
//           <h2>View and manage your complaints.</h2>

//           <select
//             onChange={(e) => setFilter(e.target.value)}
//             value={filter}
//             className="filter-dropdown"
//           >
//             <option value="all">All</option>
//             <option value="open">Open</option>
//             <option value="in progress">In Progress</option>
//             <option value="under scrutiny">Under Scrutiny</option>
//             <option value="resolved">Resolved</option>
//             <option value="closed">Closed</option>
//           </select>

//           <table className="complaints-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Title</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//                 <th>Feedback</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredComplaints.map((complaint) => (
//                 <tr key={complaint.id}>
//                   <td>{complaint.id}</td>
//                   <td>{complaint.title}</td>
//                   <td>{complaint.status}</td>
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
//                     {(complaint.status === 'closed' ||
//                       complaint.status === 'resolved') ? (
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





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../styles/ComplaintPage.css';

const ComplaintPage = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const complaints = [
    { id: 1, title: 'Internet Fraud', status: 'open', userId: 101 },
    { id: 2, title: 'Cyberbullying', status: 'closed', userId: 101 },
    { id: 3, title: 'Phishing Attempt', status: 'in progress', userId: 101 },
    { id: 4, title: 'Data Breach', status: 'resolved', userId: 101 },
    { id: 5, title: 'Harassment', status: 'under scrutiny', userId: 101 },
  ];

  const filteredComplaints =
    filter === 'all'
      ? complaints
      : complaints.filter((complaint) => complaint.status === filter);

  const isActionDisabled = (status) => {
    return (
      status === 'resolved' ||
      status === 'closed' ||
      status === 'under scrutiny'
    );
  };

  const handleFeedback = (complaintId, userId) => {
    navigate('/feedback', { state: { complaintId, userId } });
  };

  const handleUpdate = (complaintId) => {
    navigate(`/update-complaint`);
  };

  return (
    <>
      <Header />
      <div className="page-layout">
        <div className="page-container">
          <h2>View and manage your complaints.</h2>

          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="filter-dropdown"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="under scrutiny">Under Scrutiny</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <table className="complaints-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td>{complaint.id}</td>
                  <td>{complaint.title}</td>
                  <td>{complaint.status}</td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => handleUpdate(complaint.id)}
                      disabled={isActionDisabled(complaint.status)}
                    >
                      Update
                    </button>
                    <button
                      className="action-btn"
                      disabled={isActionDisabled(complaint.status)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {(complaint.status === 'closed' ||
                      complaint.status === 'resolved') ? (
                      <button
                        className="feedback-btn"
                        onClick={() =>
                          handleFeedback(complaint.id, complaint.userId)
                        }
                      >
                        Feedback
                      </button>
                    ) : (
                      <div className="empty-feedback-slot"></div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ComplaintPage;