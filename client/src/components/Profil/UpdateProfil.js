import { useSelector } from "react-redux";
import "../../styles/profilUpdate.css";
import UploadImg from "./UploadImg";

export default function UpdateProfil() {
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="profil-container">
      <h1>Profil de {userData.pseudo}</h1>
      <div className="form-update-profil">
        <div className="imageProfilUrl">
          <img
            className="img-profil"
            src={userData.picture}
            alt="user-pic"
          />
        </div>
        <UploadImg />
      </div>
    </div>
  );
}
