import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const ForgotPassword = () => {
  return (
    <>
      <Header />
      <div className="container text-center mt-5">
        <h2>Forgot Password</h2>
        <p>Reset link will be sent to your registered email.</p>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
