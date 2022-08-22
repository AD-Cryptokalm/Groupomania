const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// schéma user
const userSchema = mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minlenght: 2,
    maxlength: 25,
    unique: true,
  },
  email: { type: String, required: true, validate: [isEmail], unique: true },
  password: { type: String, required: true, minlenght: 6 },
  picture: {
    type: String,
    default: "./uploads/profil/photoProfil.png",
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("User", userSchema);
