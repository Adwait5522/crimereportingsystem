import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Register from "./Pages/Register.jsx";
import OfficerLogin from "./Pages/OfficerLogin.jsx";
import HeadquarterLogin from "./Pages/HeadquarterLogin.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import OfficerHome from "./Pages/OfficerHome.jsx";
import CaseDetails from "./Pages/CaseDetails.jsx";
import HeadquarterHome from "./Pages/HeadquaterHome.jsx";
import FileComplaintForm from "./Pages/FileComplaintForm.jsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/officer-login" element={<OfficerLogin />} />
      <Route path="/headquarter-login" element={<HeadquarterLogin />} />
      <Route path="/headquarter-home" element={<HeadquarterHome />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/head-password" element={<ForgotPassword />} />

      <Route path="/officer-home" element={<OfficerHome />} />
      <Route path="/case/:caseId" element={<CaseDetails />} />
      <Route path="/file-complaint" element={<FileComplaintForm />} />
    </Routes>
  </BrowserRouter>
);
