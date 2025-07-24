import React from 'react';

import Footer from '../Components/Footer';
import Header from '../Components/Header';
import "../styles/AddPoliceStation.css";

const AddPoliceStation = () => (
  <>
    <Header />

    <div className="page-wrapper"> {/* Centering wrapper */}
      <section className="form-container">
        <h2>Police Station Registration</h2>
        <form>
          <input type="text" placeholder="Police Station Name" required />
          <input type="number" placeholder="Police Station Pincode" required />
          <input type="text" placeholder="Google Map Location Link" required />
          <button type="submit">Register Police Station</button>
        </form>
      </section>
    </div>

    <Footer />
  </>
);

export default AddPoliceStation;
