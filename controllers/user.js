const UserModel = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;


exports.getAllUser = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

exports.getOneUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Utilisateur inconnu");

  UserModel.findById(req.params.id, (err, data) => {
    if (res) res.send(data);
    else console.log("Utilisateur inconnu");
  }).select("-password");
};

exports.modifyUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Utilisateur inconnu");

  try {
    await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          pseudo: req.body.pseudo,
          
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )

      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};


exports.deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Utilisateur inconnu");

    try {
      await UserModel.remove({_id: req.params.id}).exec();
    res.status(200).json({message: "Utilisateur supprimé"})
} catch(err) {
  return res.status(500).json({ message: err });
}};
