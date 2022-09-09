import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connexion from "../../pages/Connexion";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import NavBar from "../NavBar";

export default function Index() {

  return (
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </BrowserRouter>
  );
}
