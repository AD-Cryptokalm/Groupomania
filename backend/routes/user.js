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
router.post("/ficheUser", auth, multer, ficheUserCtrl.createFicheUser);
router.get("/ficheUser", auth, ficheUserCtrl.getAllFicheUser);
router.get("/ficheUser/:id", auth, ficheUserCtrl.getOneFicheUser);
router.put("/ficheUser/:id", auth, multer, ficheUserCtrl.modifyFicheUser);
router.delete("/ficheUser/:id", auth, multer, ficheUserCtrl.deleteFicheUser);



module.exports = router;
