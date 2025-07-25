import React, { useState } from 'react';
import axios from 'axios';

import Footer from '../Components/Footer';
import Header from '../Components/Header';

const RegisterUserForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    aadharNumber: '',
    password: '',
    gender: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/users/register', form);
      alert('User registered successfully!');
    } catch (error) {
      console.error(error);
      alert('Error registering user.');
    }
  };

  return (
    <>
      <Header />
    <div className="card">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Full Name</label>
        <input
          type="text"
          name="fullName"
          className="form-control"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <label className="form-label">Phone</label>
        <input
          type="text"
          name="phone"
          className="form-control"
          placeholder="Phone"
          onChange={handleChange}
          required
        />

        <label className="form-label">Address</label>
        <input
          type="text"
          name="address"
          className="form-control"
          placeholder="Address"
          onChange={handleChange}
          required
        />

        <label className="form-label">Aadhar Number</label>
        <input
          type="text"
          name="aadharNumber"
          className="form-control"
          placeholder="Aadhar Number"
          onChange={handleChange}
          required
        />

        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <label className="form-label">Gender</label>
        <select
          name="gender"
          className="form-control"
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default RegisterUserForm;
