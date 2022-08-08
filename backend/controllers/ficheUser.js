// const jwt = require("jsonwebtoken")
const FicheUser = require("../models/FicheUser");

exports.createFicheUser = (req, res, next) => {
  const ficheUserObject = req.body;
  delete ficheUserObject._id;
  delete ficheUserObject.userId;
  const ficheUser = new FicheUser({
    ...ficheUserObject,
    userId: req.auth.userId,
    photoProfilUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  })
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
  const ficheUserObject = req.image ? {
      ...JSON.parse(req.body),
      photoProfilUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete ficheUserObject.userId;
  FicheUser.findOne({_id: req.params.id})
      .then((ficheUser) => {
          if (ficheUser.userId != req.auth.userId) {
              res.status(401).json({ message : 'Non authorisé'});
          } else {
              FicheUser.updateOne({ _id: req.params.id}, { ...ficheUserObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Profil modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

// exports.modifyFicheUser = (req, res, next) => {
//   FicheUser.findOne({ _id: req.params.id })
//     .then((ficheUser) => {
//       if (ficheUser.userId != req.body.userId) {
//         res.status(400).json({ message: "Non autorisé !" });
//       } else {
//         FicheUser.updateOne({ _id: req.params.id }, {...req.body})
//           .then(() => res.status(201).json({ message: "Profil modifié!" }))
//           .catch((error) => res.status(400).json({ error }));
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };

exports.deleteFicheUser = (req, res, next) => {
  FicheUser.findOne({ _id: req.params.id })
    .then((ficheUser) => {
      if (ficheUser.userId != req.body.userId) {
        res.status(401).json({ message: "Non autorisé !" });
      } else {
        FicheUser.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Profil supprimé !" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

// exports.logout = (req, res, next) => {
//   res.status(200).json({
//     userId: req.auth.userId,
//     token: "",
//   });
// };
