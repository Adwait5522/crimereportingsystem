import React, { useState } from 'react';
import axios from 'axios';
import "../styles/AddOfficerForm.css"




const AddOfficerForm = () => {
  const [form, setForm] = useState({
    officerName: '',
    designationId: '',
    policeStationId: '',
    activeStatus: 'ACTIVE',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/officers/add', form);
      alert('Officer added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding officer.');
    }
  };

  return (
    <div className="card">
      <h2>Add Officer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Officer Name</label>
          <input
            type="text"
            name="officerName"
            className="form-control"
            placeholder="Officer Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Designation ID</label>
          <input
            type="number"
            name="designationId"
            className="form-control"
            placeholder="Designation ID"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Police Station ID</label>
          <input
            type="number"
            name="policeStationId"
            className="form-control"
            placeholder="Police Station ID"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="activeStatus"
            className="form-control"
            onChange={handleChange}
            required
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Add Officer</button>
      </form>
    </div>
  );
};

export default AddOfficerForm;
