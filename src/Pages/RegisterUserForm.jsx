import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <h2>User Registration</h2>
      <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
      <input type="text" name="aadharNumber" placeholder="Aadhar Number" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <select name="gender" onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterUserForm;
