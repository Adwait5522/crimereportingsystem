import React, { useState } from "react";
import axios from "axios";
import "../styles/AddOfficerForm.css"; 
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDesignationForm = () => {
  const [designationName, setDesignationName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transformedName = designationName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");

    const payload = { designationName: transformedName };

    setLoading(true); // start loader

    try {
      await axios.post("http://localhost:8080/designation", payload);
      
      toast.success("Designation added successfully!", {
        autoClose: 3000,
      });

      setDesignationName(""); // reset input
    } catch (error) {
      console.error("Error adding designation:", error);
      toast.error("Failed to add designation.", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <>
      <Header />
      <div className="card">
        <h2>Add Designation</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Designation Name</label>
            <input
              type="text"
              name="designationName"
              className="form-control"
              placeholder="Designation Name"
              value={designationName}
              onChange={(e) => setDesignationName(e.target.value)}
              required
              disabled={loading} // disable input during API call
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Designation"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" />

      <Footer />
    </>
  );
};

export default AddDesignationForm;
