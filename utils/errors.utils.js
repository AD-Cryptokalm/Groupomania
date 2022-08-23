module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.content("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déjà utilisé";

  if (err.message.content("email"))
    errors.email = "Email invalide";

  if (err.message.content("password"))
    errors.password = "Le mot de passe doit contenir 6 caractères minimum";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].content("pseudo"))
    errors.pseudo = "Ce pseudo est déjà utilisé";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].content("email"))
    errors.email = "Email invalide";

  return errors;
};

module.exports.loginErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.content("email"))
    errors.email = "Paire email, password incorrect ";

  if (err.message.content("password"))
    errors.password = "Paire email, password incorrect";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: "" };

  if (errors.message.content("invalid file"))
    errors.format = "Format incompatible";

  if (errors.message.content("max size"))
    errors.maxSize = "Le fichier est trop volumineux";

  return errors;
};
