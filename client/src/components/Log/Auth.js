import { useState } from "react";
import "../../styles/auth.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function Auth() {
  const [signUpModal, setSignUpModal] = useState(false);
  const [loginModal, setLoginModal] = useState(true);

  const handleModals = (e) => {
    if (e.target.id === "signUp") {
      setLoginModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setLoginModal(true);
      setSignUpModal(false);
    }
  };

  return (
    <>
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="signUp"
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
          {signUpModal && <SignUpForm />}
          {loginModal && <LoginForm />}
        </div>
      </div>
    </div>
    </>
  );
}
