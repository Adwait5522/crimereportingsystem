import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HeadquarterLogin.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const UpdateComplaintPage = ({ complaintId }) => {
  const [formData, setFormData] = useState({
    complaintType: '',
    description: '',
    locationPincode: '',
    city: '',
    state: '',
    officerId: '',
    priority: '',
    status: '',
    policeStationId: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/complaint/${complaintId}`)
      .then((res) => setFormData(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch complaint details.');
      });
  }, [complaintId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.put(`http://localhost:8080/complaint/${complaintId}`, formData);
      setMessage('Complaint updated successfully.');
    } catch (err) {
      console.error('Error updating complaint:', err);
      setError('Failed to update complaint.');
    }
  };

  return (
    <>
    <Header/>
    <div className="hq-login-container" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div className="hq-login-card" style={{ width: '90%', maxWidth: '1200px', padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>Update Complaint</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[
            { label: 'Complaint Type', name: 'complaintType' },
            { label: 'Description', name: 'description' },
            { label: 'Location Pincode', name: 'locationPincode' },
            { label: 'City', name: 'city' },
            { label: 'State', name: 'state' },
            { label: 'Officer ID', name: 'officerId', type: 'number' },
            { label: 'Priority', name: 'priority' },
            { label: 'Status', name: 'status' },
            { label: 'Police Station ID', name: 'policeStationId', type: 'number' },
          ].map(({ label, name, type = 'text' }) => (
            <div key={name} className="form-group" style={{ flex: '1 1 30%' }}>
              <label>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
  

          <div style={{ flex: '1 1 100%', textAlign: 'center', marginTop: '10px' }}>
            <button type="submit" className="login-btn">Update Complaint</button>
            {message && <p className="text-success">{message}</p>}
            {error && <p className="invalid-feedback">{error}</p>}
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default UpdateComplaintPage;
