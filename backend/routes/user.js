// création des routes
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


// importer le controller de user
const authCtrl = require("../controllers/auth");
const userCtrl = require("../controllers/user");


//Auth
router.post("/signup", multer, authCtrl.signup);
router.post("/login", authCtrl.login);
router.get("/logout", userCtrl.logout);
//User
// router.get("/:id", userCtrl.getOneUser);
router.put("/:id", auth, multer, userCtrl.updateUser);
router.delete("/:id", auth, multer, userCtrl.deleteUser);


module.exports = router;
