import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import Connexion from "./pages/Connexion";
import Home from "./pages/Home";
import Profil from "./pages/Profil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Connexion/>}/>
    <Route path="/accueil" element={<Home/>}/>
    <Route path="/profil" element={<Profil/>}/>
  </Routes>
  </BrowserRouter>
);
