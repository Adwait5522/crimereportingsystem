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
import UserLogin from "./Pages/UserLogin.jsx";
import AddPoliceStation from "./Pages/AddPoliceStation.jsx";
import InspectorHome from "./Pages/InspectorHome.jsx";
import RegisterUserForm from "./Pages/RegisterUserForm.jsx";
import "./index.css";

import FileComplaintForm from "./Pages/FileComplaintForm.jsx";
import ComplaintPage from "./Pages/ComplaintPage.jsx";

import AddOfficerForm from "./Pages/AddOfficerForm.jsx";
import FeedBackComplaints from "./Pages/FeedBackComplaints.jsx";
import AddDesignationForm from "./Pages/AddDesignationForm.jsx";
import SeeOfficers from "./Pages/SeeOfficers.jsx";
import UpdateComplaintPage from "./Pages/UpdateComplaintPage.jsx";
import FeedbackForm from "./Pages/FeedBackComplaints.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/complaint" element={<ComplaintPage />} />
      <Route path="/officer-login" element={<OfficerLogin />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/add-station" element={<AddPoliceStation />} />
      <Route path="/headquarter-login" element={<HeadquarterLogin />} />
      <Route path="/headquarter-home" element={<HeadquarterHome />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/head-password" element={<ForgotPassword />} />
      <Route path="/officer-home" element={<OfficerHome />} />
      <Route path="/add-officer" element={<AddOfficerForm />} />
      <Route path="/feedback-complaints" element={<FeedBackComplaints />} />
      <Route path="/feedback" element={<FeedbackForm />} />
      <Route path="/add-designation" element={<AddDesignationForm/>}/>
      <Route path="/case/:caseId" element={<CaseDetails />} />
      <Route path="/file-complaint" element={<FileComplaintForm />} />
      <Route path="/register-user-form" element={<RegisterUserForm />} />
      <Route path="/inspector-home" element={<InspectorHome />} />
      <Route path="/display-officers" element={<SeeOfficers />} />
      <Route path="/update-complaint" element={<UpdateComplaintPage/>}/>
    </Routes>
  </BrowserRouter>
);
