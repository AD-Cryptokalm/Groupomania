// création des routes
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


// importer le controller de user
const authCtrl = require("../controllers/auth");
const ficheUserCtrl = require("../controllers/ficheUser");

//Auth
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
// router.get("/logout", userCtrl.logout);


//FicheUser
router.post("/fiche_user", auth, multer, ficheUserCtrl.createFicheUser);
router.get("/fiche_user", auth, ficheUserCtrl.getAllFicheUser);
router.get("/fiche_user/:id", auth, ficheUserCtrl.getOneFicheUser);
router.put("/fiche_user/:id", auth, multer, ficheUserCtrl.modifyFicheUser);
router.delete("/fiche_user/:id", auth, multer, ficheUserCtrl.deleteFicheUser);



module.exports = router;
