// importer express pour création des routes
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();

// importer les routers
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const path = require("path");
const { appendFile } = require("fs");

// connection au server mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.MDB_USERNAME}:${process.env.MDB_PASSWORD}@${process.env.MDB_CLUSTER}.mongodb.net/groupomania`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


  const {checkUser, requireAuth} = require('./middleware/authMiddleware')

// créer une application express
const app = express();

// autorisé l'utilisateur a se servir de notre Api
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Credentials", true);
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

app.use(cookieParser());

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

// pour cette route utiliser la route saucesRoutes
app.use("/api/post", postsRoutes);
// pour cette route utiliser la route userRoutes
app.use("/api/user", userRoutes);

// app.use("/upload", express.static(path.join(__dirname, "images")));

app.use(helmet());

// exporter const app pour y acceder depuis les autres fichiers
module.exports = app;
