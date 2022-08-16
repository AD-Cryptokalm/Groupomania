// création des routes 
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer()


// importer le controller de Post
const postsCtrl = require('../controllers/posts');
const likesCtrl = require('../controllers/likes');



router.get('/',postsCtrl.getAllPost);
router.post("/", upload.single('file'),postsCtrl.createPost);
router.put('/:id', postsCtrl.modifyPost);
router.delete('/:id', postsCtrl.deletePost); 

router.post('/like/:id', likesCtrl.createLikePost);



module.exports = router;
