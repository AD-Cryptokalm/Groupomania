const http = require("http");
const app = require("./app");

app.set("port", process.env.PORT);

const server = http.createServer(app);

server.listen(
  process.env.PORT,
  console.log(`éoute du port : ${process.env.PORT}`)
);
