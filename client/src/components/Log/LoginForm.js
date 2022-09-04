import axios from "axios";
import { useState } from "react";
import "../../styles/loginSignUpForm.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then(() => {
        window.location = "/";
      })
      .catch((err) => {
        console.log(err)
        if (err.response.data.errors) {
          emailError.innerHTML = err.response.data.errors.email;
        } else if (err.response.data.errors) {
          passwordError.innerHTML = err.response.data.errors.password;
        }
        setEmail("");
        setPassword("");
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="form">
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
      <input type="submit" value="Envoyer" />
    </form>
  );
}
