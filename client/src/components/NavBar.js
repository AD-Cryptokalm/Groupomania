import "../styles/navBar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import { useSelector } from "react-redux";
// import axios from "axios";
// import axios from "axios";

export default function NavBar() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  // // const [pseudo, setPseudo] = useState(null)
  // const pseudoValue = document.getElementById('pseudoUser')
  // // axios.get(`${process.env.REACT_APP_API_URL}api/user/`+ `${uid}`)
  // const getUser = async () => {
  //   if (uid) {
  //   try {
  //     return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
  //   }catch (err) {
  //     console.log(err)
  //   }
  // }}
  // const pseudoUser= async ()=> {
  //   const user = await getUser()

  //   if (user.data.pseudo) {
  //     pseudoValue.innerHTML = user.data.pseudo
  //     console.log(user.data)
  //   }
  // }
  // pseudoUser()

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
