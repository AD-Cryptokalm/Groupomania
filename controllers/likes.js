const Post = require("../models/Post");
const User = require("../models/User")
const ObjectID = require("mongoose").Types.ObjectId;

exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { userlikers: req.body.userId },
      },
      { new: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { userlikers: req.body.userId },
      },
      { new: true })
      .then((data) => {
        return res.send(data)
      })
      .catch((err) => {
        return res.status(500).send({ message: err })});
    } catch (err) {
        return res.status(400).json(err);
    }
};