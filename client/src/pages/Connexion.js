import Log from "../components/Log/Auth";
import LoginForm from "../components/Log/LoginForm";
import Header from "../components/Header/Header";

export default function Connexion() {
  return (
    <>
      <Header />
      <Log>
        <LoginForm/>
      </Log>
    </>
  );
}
