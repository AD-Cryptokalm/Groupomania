// importer express pour création des routes
const express = require("express");

const morgan = require("morgan");

// importer mongoose
const mongoose = require("mongoose");

// importer helmet
const helmet = require("helmet");

// importer dotenv pour les variables d'environnement
require('dotenv').config(); 

// importer les routers
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const path = require("path");

// connection au server mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.MDB_USERNAME}:${process.env.MDB_PASSWORD}@${process.env.MDB_CLUSTER}.mongodb.net/groupomania`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// créer une application express
const app = express();



app.use(morgan("dev"));

// autorisé l'utilisateur a se servir de notre Api
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


app.use(express.json());
// pour cette route utiliser la route saucesRoutes
app.use("/api/post", postsRoutes);
// pour cette route utiliser la route userRoutes
app.use("/api/user", userRoutes);



app.use("/images", express.static(path.join(__dirname, "images")));

app.use(helmet());



// exporter const app pour y acceder depuis les autres fichiers
module.exports = app;
