import Log from "../components/Log/Auth";
import { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Home from "./Home";
import "../styles/half-logo.css";

export default function Connexion() {
  const uid = useContext(UidContext);

  return (
    <div className="connexionPage">
      {uid ? (
        <Home />
      ) : (
        <div className="container-connexion">
          <div className="anim-logo">
            <img src="../../demi-logo2.png" />
          </div>
          <div className="block-log">
            <Log />
          </div>
        </div>
      )}
    </div>
  );
}
