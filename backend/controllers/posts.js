// logique métier des routes

// importer le model post
const Post = require("../models/Post");


// importer fs pour gérer les images 
const fs = require("fs");

// Voir une post 
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// Voir tous les posts 
exports.getAllPost = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

// Ajouter un post 
exports.createPost = (req, res, next) => {
  const postObject = req.body.post;
  const post = new Post({
    ...postObject,
    userId: req.auth.userId,
    message: req.body.message,
  });
  post
    .save()
    .then(() => {
      res.status(201).json({ message: "Post créé !"});
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Modifier un post 
exports.modifyPost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete postObject._userId;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.body.userId) {
        res.status(401).json({ message: "Non autorisé !" });
      } else {
        Post.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
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
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: "Non autorisé !" });
      } else {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" })
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
