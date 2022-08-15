const UserModel = require("../models/User");
const jwt = require("JsonWebToken");
const { loginErrors, signUpErrors } = require("../utils/errors.utils");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "24h" });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).send({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, expiresIn: "24h" });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = loginErrors(err);
    res.status(400).send({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
