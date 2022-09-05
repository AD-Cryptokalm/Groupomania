// création des routes 
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer()

// importer le controller de Post
const postsCtrl = require('../controllers/posts');
const likesCtrl = require('../controllers/likes');
const uploadCtrl = require('../controllers/uploadPost')

router.get('/:id', postsCtrl.getPost);
router.get('/',postsCtrl.getAllPost);
router.post("/", upload.single('file'),postsCtrl.createPost);
router.put('/:id', postsCtrl.modifyPost);
router.delete('/:id', postsCtrl.deletePost); 

router.patch('/like/:id', likesCtrl.likePost);
router.patch('/unlike/:id', likesCtrl.unlikePost);

router.post('/upload', upload.single('file'), uploadCtrl.uploadPicturePost)

module.exports = router;
