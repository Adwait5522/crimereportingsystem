import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Footer from '../Components/Footer';
import Header from '../Components/Header';


const InspectorHome = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/officer/complaints')
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
     <Header />
    <div>
      <h2>Inspector Dashboard</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th><th>Description</th><th>Status</th><th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.complaintId}>
              <td>{c.complaintId}</td>
              <td>{c.description}</td>
              <td>{c.status}</td>
              <td>{c.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer />
    </>
  );
};

export default InspectorHome;
