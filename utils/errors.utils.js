exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déjà utilisé";

  if (err.message.includes("email"))
    errors.email = "Email invalide";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit contenir 6 caractères minimum";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déjà utilisé";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email invalide";

  return errors;
};

exports.loginErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email"))
    errors.email = "Paire email, password incorrect ";

  if (err.message.includes("password"))
    errors.password = "Paire email, password incorrect";

  return errors;
};

exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: "" };

  if (errors.message.includes("invalid file"))
    errors.format = "Format incompatible";

  if (errors.message.includes("max size"))
    errors.maxSize = "Le fichier est trop volumineux";

  return errors;
};
