const User = require("../models/User");
// const ObjectId = require("mongoose").Types.ObjectId;

// exports.getOneUser = (req, res, next) => {
//     if (User.userId != req.auth.userId) {
//         res.status(401).json({ message: "Id inconnu !" });
// }}

exports.updateUser = (req, res, next) => {
   
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user.userId != req.userId) {
        res.status(400).json({ message: "Non autorisé !" });
      } else {
        User.updateOne(
          { _id: req.params.id },
          { $set: {
            pseudo: req.body.pseudo
          } }
        )
          .then(() => res.status(201).json({ message: "Pseudo modifié!" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (user.userId != req.userId) {
          res.status(401).json({ message: "Non autorisé !" });
        } else {
          
            User.deleteOne({ _id: req.params.id })
              .then(() => {
                res.status(200).json({ message: "Objet supprimé !" })
              })
              .catch((error) => res.status(401).json({ error }));
          
        }
      })
      .catch((error) => res.status(400).json({ error }));
  };


exports.logout = (req, res, next) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    if (user.userId != req.auth.userId) {
      res.status(401).json({ message: "Non autorisé !" });
    } else {
    }
  });
};
