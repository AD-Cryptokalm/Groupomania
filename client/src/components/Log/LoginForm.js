import axios from "axios";
import { useState } from "react";
import "../../styles/loginSignUpForm.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [data, setData] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
          if (res.data.errors) {
              emailError.innerHTML = res.response.data;
              passwordError.innerHTML = res.data.errors.password;
            } else {
            console.log(data)
            setData(res.data.token)
          window.location = "/accueil";
        }
      })
      .catch((err) => {
        setEmail('')
        setPassword('')
        console.log(err);
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
      <input type="submit" value="Se connecter" />
    </form>
  );
}
