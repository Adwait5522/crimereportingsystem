import React from "react";
import "./Footer.css";
import logo from "../assets/Satyameva Jayate.jpeg"; // Adjust the path as needed

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column: Logo and Address */}
          <div className="col-md-4 mb-4 mb-md-0 text-center text-md-start">
            <img src={logo} alt="Logo" className="footer-logo mb-2" />
            <h5>Cyber Crime Investigation Cell</h5>
            <p>Office of Commissioner of Police</p>
            <p>Annex - 3 Building, 1st Floor</p>
            <p>Near Crawford Market, Mumbai-01</p>
            <p>Tel: 022-22630829, 22641261</p>
            <p>
              Website:{" "}
              <a
                href="http://www.cybercellmumbai.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.cybercellmumbai.com
              </a>
            </p>
          </div>

          {/* Right Column: Google Map */}
          <div className="col-md-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9815138048375!2d72.85774287497705!3d19.06455038213762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e6f6c4ca8f%3A0x4bb0182876db02f3!2sCyber%20Police%20Station%2C%20Cyber%20Crime%2C%20CID%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1753347668525!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cyber Crime Investigation Cell Map"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
