const mongoose = require("mongoose");

// ne permettre qu'une utilisation unique par adresse mail
const uniqueValidator = require("mongoose-unique-validator");

// schéma user
const userSchema = mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minLenght: 2,
    maxLength: 25,
    unique: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlenght: 6 },
  // photoProfilUrl: { type: String, default: "http://localhost:3000/images/profil/photo.jpg"}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
