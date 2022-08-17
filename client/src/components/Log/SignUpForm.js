import axios from "axios";
import { useState } from "react";
import "../../styles/loginSignUpForm.css";
import LoginForm from "./LoginForm";

export default function SignUpForm() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const confirmPasswordError = document.querySelector(
      ".confirmPassword.error"
    );
    const termsdError = document.querySelector(".terms.error");

    pseudoError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    confirmPasswordError.innerHTML = "";
    termsdError.innerHTML = "";

    if (password !== confirmPassword || !terms.checked) {
      if (password !== confirmPassword)
        confirmPasswordError.innerHTML =
          "Les mots de passe ne sont pas identiques";

      if (!terms.checked)
        termsdError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/signup`,
        withCredentials: true,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then(() => {
          
            setFormSubmit(true);
          })
        
        .catch((err) => {
          setPseudo("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          terms.checked = "";
          pseudoError.innerHTML = err.response.data.errors.pseudo;
          emailError.innerHTML = err.response.data.errors.email;
          passwordError.innerHTML = err.response.data.errors.password;
        });
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <LoginForm />
          <h4 className="succesSignUp">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleSignUp} id="form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div className="pseudo error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="confirmPassword">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <div className="confirmPassword error"></div>
          <br />
          <input type="checkbox" id="terms" className="checkboxTerms" />
          <label htmlFor="terms">
            J'accepte les
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="S'enregistrer" />
        </form>
      )}
    </>
  );
}
