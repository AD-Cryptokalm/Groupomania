
// création des routes 
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// importer le controller de Post
const postsCtrl = require('../controllers/posts');
const likesCtrl = require('../controllers/likes');


router.get('/', auth, postsCtrl.getAllPost);

router.get('/:id', auth, postsCtrl.getOnePost);

router.post("/", auth, multer, postsCtrl.createPost);

router.put('/:id', auth, multer, postsCtrl.modifyPost);

router.delete('/:id', auth, multer, postsCtrl.deletePost); 

router.post('/:id/like', auth, likesCtrl.creatLikePost);



module.exports = router;
