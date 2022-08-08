const mongoose = require("mongoose");
// schéma fiche user
const ficheUserSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    poste: { type: String, required: true },
  },
);

module.exports = mongoose.model("Fiche_User", ficheUserSchema);
