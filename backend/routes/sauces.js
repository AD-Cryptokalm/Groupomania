
// création des routes 
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// importer le controller de sauce
const saucesCtrl = require('../controllers/sauces');
const likesCtrl = require('../controllers/likes');


router.get('/', auth, saucesCtrl.getAllSauce);

router.get('/:id', auth, saucesCtrl.getOneSauce);

router.post("/", auth, multer, saucesCtrl.createSauce);

router.put('/:id', auth, multer, saucesCtrl.modifySauce);

router.delete('/:id', auth, multer, saucesCtrl.deleteSauce); 

router.post('/:id/like', auth, likesCtrl.creatLikeSauce);



module.exports = router;
