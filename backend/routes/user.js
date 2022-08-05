// création des routes
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// importer le controller de user
const authCtrl = require("../controllers/auth");
const userCtrl = require("../controllers/user");

//Auth
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
//User
// router.get("/:id", userCtrl.getOneUser);
router.put("/:id", auth, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);
router.get("/logout", auth, userCtrl.logout);

module.exports = router;
