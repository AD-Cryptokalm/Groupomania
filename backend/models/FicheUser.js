const mongoose = require("mongoose");
// schéma fiche ficheUser
const ficheUserSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    service: { type: String, required: true },
    photoProfilUrl: {type: String, required: true}
  },
);

module.exports = mongoose.model("Fiche_User", ficheUserSchema);
