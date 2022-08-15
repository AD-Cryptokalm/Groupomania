const UserModel = require("../models/User");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);


const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
  }; 
// const path = require("path");

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
        !MIME_TYPES
    )
      throw Error("Format fichier invalide");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    return res.status(400).json(err);
  }

  const filename = req.body.userId + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${filename}`
    )
  );
};
