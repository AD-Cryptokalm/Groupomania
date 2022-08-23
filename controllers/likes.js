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
        $addToSet: { likers: req.body.userId },
      },
      { new: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));

    await User.findByIdAndUpdate(
      req.body.userId,
      {
        $addToSet: { likes: req.params.id },
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
        $pull: { likers: req.body.userId },
      },
      { new: true })
      .then((data) => {
        return res.send(data)
      })
      .catch((err) => {
        return res.status(500).send({ message: err })});

    await User.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
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