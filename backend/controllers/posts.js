// logique métier des routes

// importer le model post
const Post = require("../models/Post");

// importer fs pour gérer les images 
const fs = require("fs");


// Voir tous les posts
exports.getAllPost = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

// Ajouter un post
exports.createPost = (req, res, next) => {
  const postObject = req.body;
  delete postObject._id;
  delete postObject._userId;
  const post = new Post({
    ...postObject,
    userId: req.body.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  post
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
// exports.createPost = (req, res, next) => {
//   const post = new Post({
//     userId: req.body.userId,
//     message: req.body.message,
//     likes: req.body.likes,
//     usersLiked: [],
//   });
//   post
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Post créé !" });
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };

// Modifier un post
exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.body.userId) {
        res.status(401).json({ message: "Non autorisé !" });
      } else {
        Post.updateOne({ _id: req.params.id }, { message: req.body.message })
          .then(() => res.status(200).json({ message: "Post modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.body.userId) {
        res.status(401).json({ message: "Non autorisé !" });
      } else {
        Post.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Post supprimé !" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
