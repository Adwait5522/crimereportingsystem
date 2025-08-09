import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const InspectorHome = () => {
  const [complaints, setComplaints] = useState([]);
  const [assignedFilter, setAssignedFilter] = useState('All');
  const [officersList, setOfficersList] = useState({});
  const [stationOfficers, setStationOfficers] = useState([]);
  const [editValues, setEditValues] = useState({});
  const navigate = useNavigate();

  const inspectorId = localStorage.getItem('officerId');
  const inspectorName = localStorage.getItem('officerName') || 'Inspector';

  useEffect(() => {
    if (inspectorId) {
      axios
        .get(`http://localhost:8080/officers/inspectors/${inspectorId}/station-complaints`)
        .then((res) => {
          const complaintsData = res.data;

          const initEdit = {};
          complaintsData.forEach(c => {
            initEdit[c.complaintId] = { status: c.status, priority: c.priority };
          });
          setEditValues(initEdit);

          const officerIds = complaintsData
            .filter(c => c.officerId !== null)
            .map(c => c.officerId);

          Promise.all(
            officerIds.map(id =>
              axios.get(`http://localhost:8080/officers/${id}`).then(res => ({ id, name: res.data.officerName }))
            )
          ).then(results => {
            const officerMap = {};
            results.forEach(({ id, name }) => {
              officerMap[id] = name;
            });
            setOfficersList(officerMap);
          });

          setComplaints(complaintsData);
        })
        .catch((err) => console.error('Error fetching complaints:', err));

      axios
        .get(`http://localhost:8080/officers/officersBy/${inspectorId}`)
        .then(res => setStationOfficers(res.data))
        .catch(err => console.error('Error fetching station officers:', err));
    }
  }, [inspectorId]);

  const filteredComplaints = complaints.filter(c => {
    if (assignedFilter === 'Assigned') return c.officerId !== null;
    if (assignedFilter === 'Unassigned') return c.officerId === null;
    return true;
  });

  const handleAssign = (complaintId, officerId) => {
    axios
      .put(`http://localhost:8080/complaints/${complaintId}/assign/${officerId}`)
      .then(() => {
        setComplaints(prev =>
          prev.map(c =>
            c.complaintId === complaintId ? { ...c, officerId } : c
          )
        );
        axios
          .get(`http://localhost:8080/officers/${officerId}`)
          .then(res =>
            setOfficersList(prev => ({ ...prev, [officerId]: res.data.officerName }))
          );
      })
      .catch(err => console.error('Error assigning officer:', err));
  };

  const handleChange = (complaintId, field, value) => {
    setEditValues(prev => ({
      ...prev,
      [complaintId]: { ...prev[complaintId], [field]: value }
    }));
  };

  const handleSubmit = (complaintId) => {
    const { status, priority } = editValues[complaintId];

    axios.put(`http://localhost:8080/complaints/change-status`, {
      complaintId,
      status
    })
    .then(() => {
      axios.put(`http://localhost:8080/complaints/change-priority`, {
        complaintId,
        priority
      })
      .then(() => {
        alert(`Complaint ${complaintId} updated successfully!`);
      })
      .catch(err => {
        console.error('Error updating priority:', err);
        alert(`Failed to update priority for complaint ${complaintId}`);
      });
    })
    .catch(err => {
      console.error('Error updating status:', err);
      alert(`Failed to update status for complaint ${complaintId}`);
    });
  };

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <h2>Welcome Inspector, {inspectorName}</h2>

        <div style={{ marginBottom: '15px' }}>
          <label>Filter by Assignment Status: </label>
          <select value={assignedFilter} onChange={(e) => setAssignedFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Assigned">Assigned</option>
            <option value="Unassigned">Unassigned</option>
          </select>
        </div>

        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Complaint Type</th>
              <th>Description</th>
              <th>City</th>
              <th>State</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Officer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((c) => (
              <tr key={c.complaintId}>
                <td
                  style={{ color: '#0d6efd', cursor: 'pointer' }}
                  onClick={() => navigate(`/case/${c.complaintId}`)}
                >
                  C{c.complaintId.toString().padStart(3, '0')}
                </td>
                <td>{c.complaintType}</td>
                <td>{c.description}</td>
                <td>{c.city}</td>
                <td>{c.state}</td>

                <td>
                  <select
                    value={editValues[c.complaintId]?.status || c.status}
                    onChange={(e) => handleChange(c.complaintId, 'status', e.target.value)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="INVESTIGATING">INVESTIGATING</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </td>

                <td>
                  <select
                    value={editValues[c.complaintId]?.priority || c.priority}
                    onChange={(e) => handleChange(c.complaintId, 'priority', e.target.value)}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>
                </td>

                <td>
                  {c.officerId ? (
                    officersList[c.officerId] || 'Loading...'
                  ) : (
                    <select
                      defaultValue=""
                      onChange={(e) => handleAssign(c.complaintId, e.target.value)}
                    >
                      <option value="" disabled>Select Officer</option>
                      {stationOfficers.map((o) => (
                        <option key={o.officerId} value={o.officerId}>
                          {o.officerName}
                        </option>
                      ))}
                    </select>
                  )}
                </td>

                <td>
                  <button onClick={() => handleSubmit(c.complaintId)}>Submit</button>
                </td>
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
