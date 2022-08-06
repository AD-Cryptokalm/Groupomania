// const jwt = require("jsonwebtoken")
const User = require("../models/User");

exports.getAllUser = (req, res, next) => {
  User.find()
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user.userId != req.userId) {
        res.status(400).json({ message: "Non autorisé !" });
      } else {
        res.status(200).json(user);
      }
    })
    .select("-password")
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.updateUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user.userId != req.userId) {
        res.status(400).json({ message: "Non autorisé !" });
      } else {
        User.updateOne({ _id: req.params.id }, { pseudo: req.body.pseudo })
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
            res.status(200).json({ message: "Profil supprimé !" });
          })
          .catch((error) => res.status(401).json({ error }));
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
