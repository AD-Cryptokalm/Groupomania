// création des routes
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const controleEmail = require("../middleware/controleEmail");

// importer le controller de user
const authCtrl = require("../controllers/auth");
const userCtrl = require("../controllers/user");

//Auth user
router.post("/signup", controleEmail,authCtrl.signup);
router.post("/login",authCtrl.login);
router.get("/logout", authCtrl.logout);

//User profil
router.get("/", auth, userCtrl.getAllUser);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, multer, userCtrl.modifyUser);
router.delete("/:id", auth, multer, userCtrl.deleteUser);



module.exports = router;
