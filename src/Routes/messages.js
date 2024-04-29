const express = require("express");
const messageRoute = express.Router();
const messageController = require("../Controllers/message.controller");
const { validateUser } = require("../middleware/authMiddleware");

messageRoute.post("/", validateUser, messageController.createMessage);
messageRoute.get("/:chatId", validateUser, messageController.getAllMessages);

module.exports = messageRoute;
