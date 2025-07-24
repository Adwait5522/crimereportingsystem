import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useNavigate } from "react-router-dom";
import "./Components/Header";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
function App() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="app-container">
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
      <Footer />
    </>
  );
}

export default App;
