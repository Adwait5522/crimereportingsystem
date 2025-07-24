import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Register from "./Pages/Register.jsx";
import OfficerLogin from "./Pages/OfficerLogin.jsx";
import HeadquarterLogin from "./Pages/HeadquarterLogin.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/officer-login" element={<OfficerLogin />} />
      <Route path="/headquarter-login" element={<HeadquarterLogin />} />
    </Routes>
  </BrowserRouter>
);
