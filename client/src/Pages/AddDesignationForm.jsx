import React, { useState } from "react";
import axios from "axios";
import "../styles/AddOfficerForm.css"; // Reuse the same CSS
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const AddDesignationForm = () => {
  const [designationName, setDesignationName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transformedName = designationName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");

    const payload = {
      designationName: transformedName,
    };

    console.log("Payload being sent to backend:", payload); // ✅ DEBUG LOG

    try {
      await axios.post("http://localhost:8080/designation", payload);
      alert("Designation added successfully!");
      setDesignationName("");
    } catch (error) {
      console.error("Error adding designation:", error);
      alert("Failed to add designation.");
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
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Designation
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddDesignationForm;
