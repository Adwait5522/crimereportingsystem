 import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h1 className="title">Welcome to Complaint Portal</h1>
      <div className="button-group">
        {/* <button className="btn" onClick={() => navigate("/register")}>
          Register a Complaint
        </button> */}
        <button className="btn" onClick={() => navigate("/file-complaint")}>
          Register a Complaint
        </button>
        <button className="btn" onClick={() => navigate("/officer-login")}>
          Officer Login
        </button>
        <button className="btn" onClick={() => navigate("/headquarter-login")}>
          Headquarter Login
        </button>
      </div>
    </div>
  );
}

export default App;
