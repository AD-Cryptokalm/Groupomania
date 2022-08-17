const UserModel = require("../models/User");
const jwt = require("JsonWebToken");
const { loginErrors, signUpErrors } = require("../utils/errors.utils");


const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).send({ errors });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = loginErrors(err);
    res.status(400).send({ errors });
  }
};

exports.logout = (req, res) => {
  try {
    
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  } catch (err) {
    console.log(err)
  }
  
};
