const Post = require("../models/Post");

// Ajout likes ou dislikes 
exports.createLikePost = (req, res, next) => {
  // identifier la post
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      // Ajouter un like
      if (req.body.like == 1) {
        post.likes++;
        post.usersLiked.push(req.body.userId);
        post.save();
      }

      // changement de choix de like/dislike
      if (req.body.like == 0 && post.usersLiked.indexOf(req.body.userId) != -1 ) {
        if (post.likes >= 1) {
          post.likes--;
        post.usersLiked.pull(req.body.userId);
        post.save();
      }}

      res.status(200).json({ message: "Choix enregistré !" });
    })

    .catch((error) => {
      res.status(500).json({ error });
    });
};
