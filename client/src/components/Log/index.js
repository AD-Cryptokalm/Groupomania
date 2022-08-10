import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Banner from "../Banner/Banner";
import "../../styles/connexion.css";

const Auth = () => {
  const [signUpModal, setSignUpModal] = useState(true);
  const [loginModal, setLoginModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "signup") {
      setLoginModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setLoginModal(true);
      setSignUpModal(false);
    }
  };

  return (
    <>
      <Banner />
      <div className="connection-form">
        <div className="form-container">
          <ul>
            <li
              onClick={handleModals}
              id="signup"
              className={signUpModal ? "activeAuthButton" : "authButton"}
            >
              S'inscrire
            </li>
            <li
              onClick={handleModals}
              id="login"
              className={loginModal ? "activeAuthButton" : "authButton"}
            >
              Se connecter
            </li>
          </ul>
          <div className="formModal">
            {signUpModal && <SignupForm />}
            {loginModal && <LoginForm />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
