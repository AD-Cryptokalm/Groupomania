const Sauce = require("../models/Sauce");

// Ajout likes ou dislikes 
exports.creatLikeSauce = (req, res, next) => {
  // identifier la sauce
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // Ajouter un like
      if (req.body.like == 1) {
        sauce.likes++;
        sauce.usersLiked.push(req.body.userId);
        sauce.save();
      }

      // Ajouter un dislike
      if (req.body.like == -1) {
        sauce.dislikes++;
        sauce.usersDisliked.push(req.body.userId);
        sauce.save();
      }

      // changement de choix de like/dislike
      if (req.body.like == 0 && sauce.usersLiked.indexOf(req.body.userId) != -1 ) {
        if (sauce.likes >= 1) {
          sauce.likes--;
        sauce.usersLiked.pull(req.body.userId);
        sauce.save();
      }}

      if (req.body.like == 0 && sauce.usersDisliked.indexOf(req.body.userId) != -1 ) {
        if (sauce.dislikes >= 1) {
          sauce.dislikes--;
        sauce.usersDisliked.pull(req.body.userId);
        sauce.save();
      }}
      

      res.status(200).json({ message: "Choix enregistré !" });
    })

    .catch((error) => {
      res.status(500).json({ error });
    });
};
