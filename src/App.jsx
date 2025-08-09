// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import { useNavigate } from "react-router-dom";
// import "./Components/Header";
// import Header from "./Components/Header";
// import Footer from "./Components/Footer";
// function App() {
//   const navigate = useNavigate();

//   return (
//     <>
//       <Header />
//       <div className="app-container">
//         <h1 className="title">Welcome to Complaint Portal</h1>
//         <div className="button-group">
//           <button
//             className="btn btn-success"
//             onClick={() => navigate("/user-login")}
//           >
//             Register a Complaint
//           </button>
//           <button
//             className="btn btn-success"
//             onClick={() => navigate("/officer-login")}
//           >
//             Officer Login
//           </button>
//           <button
//             className="btn btn-success"
//             onClick={() => navigate("/headquarter-login")}
//           >
//             Headquarter Login
//           </button>


        

//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Import background images
import img1 from "./assets/indian-logo-satyamev-jayate.png";
import img2 from "./assets/Supreme-Court-of-India.jpg";
import img3 from "./assets/cbi.jpg";
import img4 from "./assets/bombay-high-court.jpg";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="app-container">

        {/* Background Slideshow */}
        <div className="background-slideshow">
          <img src={img1} alt="Satyamev Jayate" />
          <img src={img2} alt="Supreme Court" />
          <img src={img3} alt="CBI" />
          <img src={img4} alt="Prime Minister of India" />
        </div>

        {/* Foreground Content */}
        <div className="app-content">
          <h1 className="title">Welcome to Complaint Portal</h1>
          <div className="button-group">
            <button
              className="btn btn-success"
              onClick={() => navigate("/user-login")}
            >
              Register a Complaint
            </button>
            <button
              className="btn btn-success"
              onClick={() => navigate("/officer-login")}
            >
              Officer Login
            </button>
            <button
              className="btn btn-success"
              onClick={() => navigate("/headquarter-login")}
            >
              Headquarter Login
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
