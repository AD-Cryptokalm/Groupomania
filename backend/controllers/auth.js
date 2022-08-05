// importer la fonction cryptage
const bcrypt = require("bcrypt");

// importer la fonction jsonwebtoken
const jwt = require("JsonWebToken");

// importer le model user
const User = require("../models/User");

// création compte
exports.signup = (req, res, next) => {
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        picture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        ...userObject,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// connection
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire utilisateur/mot de passe incorecte !" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Paire utilisateur/mot de passe incorecte !" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
