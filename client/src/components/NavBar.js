import "../styles/navBar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import { useSelector } from "react-redux";

export default function NavBar() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="navBar">
        <div className="logo">
          <NavLink to="/">
            <div className="logo-img">
              <img src="../../logoNav.png" alt="logo entreprise" />
            </div>
          </NavLink>
        </div>
        {uid ? (
          <div className="welcomeLogout-container">
            <div className="welcome">
              <h5>Bienvenue {userData.pseudo}</h5>
            </div>
            <Logout />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
}
