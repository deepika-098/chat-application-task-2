const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});
