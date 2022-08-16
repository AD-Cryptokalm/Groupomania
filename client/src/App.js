import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UidContext } from "./components/AppContext";
import Connexion from "./pages/Connexion";
import Home from "./pages/Home";
import Profil from "./pages/Profil";

export default function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          setUid(res.data);
          })
        .catch((err) => console.log("No token"));
    };
    fetchToken();
  }, []);

  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/accueil" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </BrowserRouter>
    </UidContext.Provider>
  );
}
