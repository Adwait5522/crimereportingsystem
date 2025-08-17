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
  const [priorityUpdated, setPriorityUpdated] = useState({}); // track updated priorities

  const navigate = useNavigate();
  const inspectorId = localStorage.getItem('officerId');
  const inspectorName = localStorage.getItem('officerName') || 'Inspector';

  useEffect(() => {
    if (inspectorId) {
      // Fetch complaints
      axios
        .get(`http://localhost:8080/officers/inspectors/${inspectorId}/station-complaints`)
        .then((res) => {
          const complaintsData = res.data;

          const officerIds = complaintsData
            .filter(c => c.officerId !== null)
            .map(c => c.officerId);

          // Fetch officer names
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

      // Fetch officers in the station
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
              <th>Change Priority</th>
              <th>Officer</th>
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
                <td>{c.status}</td>
                <td>
                  <select
                    value={c.priority}
                    disabled={priorityUpdated[c.complaintId]} // freeze after update
                    onChange={(e) => {
                      const newPriority = e.target.value;
                      axios
                        .put(`http://localhost:8080/complaints/${c.complaintId}/priority`, {
                          priority: newPriority,
                        })
                        .then(() => {
                          setComplaints((prev) =>
                            prev.map((complaint) =>
                              complaint.complaintId === c.complaintId
                                ? { ...complaint, priority: newPriority }
                                : complaint
                            )
                          );
                          setPriorityUpdated((prev) => ({ ...prev, [c.complaintId]: true }));
                        })
                        .catch((err) => console.error('Error updating priority:', err));
                    }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
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
