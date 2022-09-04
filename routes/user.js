// création des routes
const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer()

// importer le controller de user
const authCtrl = require("../controllers/auth");
const userCtrl = require("../controllers/user");
const uploadCtrl = require("../controllers/upload");

//Auth user
router.post("/signup",authCtrl.signUp);
router.post("/login",authCtrl.login);
router.get("/logout", authCtrl.logout);

//User profil
router.get("/", userCtrl.getAllUser);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id",  userCtrl.modifyUser);
router.delete("/:id", userCtrl.deleteUser);

router.post('/upload', upload.single('file'), uploadCtrl.uploadProfil)

module.exports = router;
