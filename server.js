// const express = require("express");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const userRoutes = require("./routes/user");
// const postsRoutes = require("./routes/posts");
// require("dotenv").config({ path: "./config/.env" });
// require("./config/db");
// const { checkUser, requireAuth } = require("./middleware/authMiddleware");
// const cors = require("cors");

// const app = express();

// const corsOptions = {
//   origin: process.env.CLIENT_URL,
//   credentials: true,
//   allowedHeaders: ["sessionId", "Content-Type"],
//   exposedHeaders: ["sessionId"],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
// };
// app.use(cors(corsOptions));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

// // jwt
// app.get("*", checkUser);
// app.get("/jwtid", requireAuth, (req, res) => {
//   res.status(200).send(res.locals.user._id);
// });

// // routes
// app.use("/api/user", userRoutes);
// app.use("/api/post", postsRoutes);

// // server
// app.listen(process.env.PORT, () => {
//   console.log(`Listening on port ${process.env.PORT}`);
// });
const http = require("http");
const app = require("./app");

app.set("port", process.env.PORT);

const server = http.createServer(app);

server.listen(
  process.env.PORT,
  console.log(`éoute du port : ${process.env.PORT}`)
);