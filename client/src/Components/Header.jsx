import { Link } from "react-router-dom";
import logo from "../assets/Satyameva Jayate.jpeg"; // Ensure this file exists
import "./Header.css";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" className="logo-img me-2" />
          Complaint Portal
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user-login">
                Register Complaint
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/officer-login">
                Officer Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/headquarter-login">
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
