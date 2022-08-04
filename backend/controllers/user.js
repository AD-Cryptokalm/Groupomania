const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

// exports.getOneUser = (req, res, next) => {
//     if (User.userId != req.auth.userId) {
//         res.status(401).json({ message: "Id inconnu !" });
// }}

exports.updateUser = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)) 
        return res.status(400).send({ message: "Non autorisé !" });
    try {
       User.findOneAndUpdate(
        { _id: req.params.id },
        {$set: {
            pseudo: req.body.pseudo
        }},
        {new: true, upsert: true, setDefaultsOnInsert: true},
        (err, docs) => {
            if(!err) return res.send(docs);
            if(err) return res.status(500).send({ error });
        }
       ) 
    } catch (err) {
        return res.status(500).json({ error });
    }
};


exports.logout = (req, res, next) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    if (user.userId != req.auth.userId) {
      res.status(401).json({ message: "Non autorisé !" });
    } else {
    }
  });
};
