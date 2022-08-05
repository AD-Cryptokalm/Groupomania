// importation de mongoose pour la gestion des schémas
const mongoose = require("mongoose");
// schéma sauce
const postSchema = mongoose.Schema(
  {
    posterId: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String},
    video: { type: String},
    // schema like/dislike
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
    //commentaires
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
