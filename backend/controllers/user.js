// const jwt = require("jsonwebtoken")
const User = require("../models/User");

const fs = require("fs");

exports.updateUser = (req, res, next) => {
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        picture: `${req.protocol}://${req.get("host")}/images/profil/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete userObject._userId;
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user.userId != req.userId) {
        res.status(400).json({ message: "Non autorisé !" });
      } else {
        User.updateOne(
          { _id: req.params.id },
          {
            $set: {
              pseudo: req.body.pseudo,
            },
          }
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
        const filename = user.picture.split("/images/profil/")[1];
        fs.unlink(`images/profil/${filename}`, () => {
          User.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Profil supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.logout = (req, res, next) => {
  res.status(200).json({
    userId: req.auth.userId,
    token: "",
  });
};
