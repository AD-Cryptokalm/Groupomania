const postModel = require("../models/Post");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

exports.getPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Utilisateur inconnu");

  postModel.findById(req.params.id, (err, data) => {
    if (res) res.send(data);
    else console.log("Utilisateur inconnu");
  })
};

// Voir tous les posts
exports.getAllPost = (req, res, next) => {
  postModel.find((err, data) => {
    if (!err) res.send(data);
    else console.log(err);
  }).sort({createdAt: -1})
};

// Ajouter un post
exports.createPost = async (req, res, next) => {
  let fileName;

  if (req.file !== null) {
    try {
      if (!MIME_TYPES) throw Error("invalid file");

      if (req.file.size > 5000000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(400).json({ errors });
    }

    fileName = req.body.userId + Date.now() + ".jpg";
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  }

  const newPost = new postModel({
    userId: req.body.userId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Modifier un post
exports.modifyPost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnu :" + req.params.id);
  const modifyRec = {
    message: req.body.message,
  };
  postModel.findByIdAndUpdate(
    req.params.id,
    { $set: modifyRec },
    { new: true },
    (err, data) => {
      if (!err) res.send(data);
      else console.log(err);
    }
  );
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnu :" + req.params.id);

  postModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) res.send({ message: "post supprim??" });
    else console.log(err);
  });
};

