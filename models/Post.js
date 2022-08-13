// importation de mongoose pour la gestion des schémas
const mongoose = require("mongoose");
// schéma sauce
const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String },
    likes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
