// importation de mongoose pour la gestion des schémas
const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    message: { type: String, required: true },
    picture: { type: String },
    userlikers: { type: [String]}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
