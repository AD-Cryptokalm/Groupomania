import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/profilUpdate.css";
import UploadImg from "./UploadImg";
import { updateProfil } from "../../actions/user.action";

export default function UpdateProfil() {
  const [pseudo, setPseudo] = useState("");
  
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleProfil = () => {
    dispatch(updateProfil(userData._id, pseudo));
  };

  return (
    <div className="profil-container">
      <h1>Profil de {userData.pseudo}</h1>
      <div className="container-form-update">
        <div className="form-update-profil" id="form">
          <div className="imageProfilUrl">
            <img className="img-profil" src={userData.picture} alt="user-pic" />
          </div>
          <UploadImg />
          <form action="" onSubmit={handleProfil}>
            <label htmlFor="pseudo">Modifier pseudo</label>
            <br />
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo}
            />
            <div className="pseudo error"></div>
          </form>
          
          <input type="submit" value="Modifier pseudo" />
        </div>
      </div>
    </div>
  );
}
