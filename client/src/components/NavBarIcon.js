import { NavLink } from "react-router-dom";
import  "../styles/navBarIcon.css"

export default function NavBarIcon() {

    return (
        <div className="container-navBarIcon">
            <ul className="icon-list">
                <li className="icon">
                    <NavLink to='/' >
                    <i className="fa-solid fa-house"></i>
                    </NavLink>
                </li>
                <li className="icon">
                    <NavLink to='/profil' >
                    <i className="fa-regular fa-user"></i>
                    </NavLink>
                </li>

            </ul>
        </div>
    );
};