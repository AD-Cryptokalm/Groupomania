// const jwt = require("jsonwebtoken")
const FicheUser = require("../models/User");

const fs = require("fs");


exports.getAllUser = async (req, res, next) => {
  try {
    const ficheUser = await ficheUser.find({}).select("-password");
    res.status(200).json(ficheUser);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const ficheUser = await ficheUser.findById({ _id: req.params.id }).exec();
    res.status(200).json(ficheUser);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.modifyUser = (req, res, next) => {
  const ficheUserObject = req.image
    ? {
        ...JSON.parse(req.body),
        photoProfilUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete ficheUserObject.userId;
  FicheUser.findOne({ _id: req.params.id })
    .then((ficheUser) => {
      if (ficheUser.userId != req.auth.userId) {
        res.status(401).json({ message: "Non authorisé" });
      } else {
        FicheUser.updateOne(
          { _id: req.params.id },
          { ...ficheUserObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Profil modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteUser = (req, res, next) => {
  FicheUser.findOne({ _id: req.params.id })
    .then((ficheUser) => {
      if (ficheUser.userId != req.auth.userId) {
        res.status(401).json({ message: "Non authorisé" });
      } else {
        const filename = ficheUser.photoProfilUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          FicheUser.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


