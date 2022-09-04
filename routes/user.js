// création des routes
const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer()

// importer le controller de user
const authCtrl = require("../controllers/auth");
const userCtrl = require("../controllers/user");
const uploadCtrl = require("../controllers/upload");
const { checkUser } = require("../middleware/authMiddleware");

//Auth user
router.post("/signup",authCtrl.signUp);
router.post("/login",authCtrl.login);
router.get("/logout", authCtrl.logout);

//User profil
router.get("/", checkUser, userCtrl.getAllUser);
router.get("/:id", checkUser, userCtrl.getOneUser);
router.put("/:id", checkUser,  userCtrl.modifyUser);
router.delete("/:id", checkUser, userCtrl.deleteUser);

router.post('/upload', upload.single('file'), uploadCtrl.uploadProfil)

module.exports = router;
