import Log from "../components/Log/Auth";
import Header from "../components/Header/Header";
import { useContext } from "react";
import { UidContext } from "../components/AppContext";
export default function Connexion() {
  const uid = useContext(UidContext);

  return (
    <div className="connexionPage">
      {uid ? (
        <h1>Update page</h1>
      ) : (
        <div>
          <Header />
          <Log />
        </div>
      )}
    </div>
  );
}
