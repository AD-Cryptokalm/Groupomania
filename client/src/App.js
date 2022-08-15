import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connexion from "./pages/Connexion";
import Home from "./pages/Home";
import Profil from "./pages/Profil";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Connexion/>}/>
      <Route path="/accueil" element={<Home/>}/>
      <Route path="/profil" element={<Profil/>}/>
    </Routes>
    </BrowserRouter>
  
  )
}
