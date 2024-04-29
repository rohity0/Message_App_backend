const express = require("express");
require("dotenv").config();
require("./config/database");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 9000;
const router = require("./Routes/routes");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const server = app.listen(PORT, () =>
  console.log("Server is running port " + PORT)
);

app.use("/api", router);
const io = require("socket.io")(server, { pingTimeout: 60000 });

io.on("connection", (socket) => {

  socket.on("join room", (room) => socket.join(room));
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessage) => {
    var chat = newMessage.chat;

    if (!chat.users) return console.log("Chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) return;
      console.log(user);
      socket.in(user._id).emit("message received", newMessage);
    });
  });
});
