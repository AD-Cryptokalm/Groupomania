import Log from "../components/Log/Auth";
import { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Home from "./Home";
// import UpdateProfil from "../components/Profil/UpdateProfil";


export default function Connexion() {
  const uid = useContext(UidContext);

  return (
    <div className="connexionPage">
      {uid ? (
        <Home/>
      ) : (
        <div>
          <Log />
        </div>
      )}
    </div>
  );
}
