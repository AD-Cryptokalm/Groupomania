// const jwt = require("jsonwebtoken")
const FicheUser = require("../models/FicheUser");

exports.createFicheUser = (req, res, next) => {
  const ficheUserObject = req.body;
  const ficheUser = new FicheUser({
    ...ficheUserObject,
  });

  console.log(ficheUser);
  ficheUser
    .save()
    .then(() => res.status(201).json({ message: "Profil créée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllFicheUser = (req, res, next) => {
  FicheUser.find()
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneFicheUser = (req, res, next) => {
  FicheUser.findOne({ _id: req.params.id })
    .then((ficheUser) => res.status(200).json(ficheUser))
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyFicheUser = (req, res, next) => {
  FicheUser.findOne({ _id: req.params.id })
    .then((ficheUser) => {
      if (ficheUser.userId != req.body.userId) {
        res.status(400).json({ message: "Non autorisé !" });
      } else {
        FicheUser.updateOne({ _id: req.params.id }, {...req.body})
          .then(() => res.status(201).json({ message: "Profil modifié!" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// exports.deleteUser = (req, res, next) => {
//   User.findOne({ _id: req.params.id })
//     .then((user) => {
//       if (user.userId != req.userId) {
//         res.status(401).json({ message: "Non autorisé !" });
//       } else {
//         User.deleteOne({ _id: req.params.id })
//           .then(() => {
//             res.status(200).json({ message: "Profil supprimé !" });
//           })
//           .catch((error) => res.status(401).json({ error }));
//       }
//     })
//     .catch((error) => res.status(400).json({ error }));
// };

exports.logout = (req, res, next) => {
  res.status(200).json({
    userId: req.auth.userId,
    token: "",
  });
};
