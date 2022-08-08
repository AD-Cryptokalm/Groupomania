// création des routes
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config");


// importer le controller de user
const authCtrl = require("../controllers/auth");
const ficheUserCtrl = require("../controllers/ficheUser");

//Auth
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
// router.get("/logout", userCtrl.logout);


//FicheUser
router.post("/ficheUser", ficheUserCtrl.createFicheUser);
router.get("/ficheUser", ficheUserCtrl.getAllFicheUser);



// router.get("/:id", userCtrl.getOneUser);
// router.put("/:id", auth, multer, userCtrl.updateUser);
// router.delete("/:id", auth, multer, userCtrl.deleteUser);

module.exports = router;
