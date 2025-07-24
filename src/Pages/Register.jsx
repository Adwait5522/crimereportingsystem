import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "../styles/Page.css";

function Register() {
  return (
    <>
      <Header />
      <div className="page-container">
        <h2>Register a Complaint</h2>
        <p>Please fill out the form to register your complaint.</p>
      </div>
      <Footer />
    </>
  );
}

export default Register;
