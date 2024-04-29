const express = require("express");
const chatRoute = express.Router();
const chatController = require("../Controllers/chat.controller");
const { validateUser } = require("../middleware/authMiddleware");

chatRoute.post("/group", validateUser, chatController.createGroupChat);
chatRoute.get("/", validateUser, chatController.getChats);
chatRoute.get("/:chatId", validateUser, chatController.getChatById);
chatRoute.post("/single", validateUser, chatController.getSingleChatBox);
chatRoute.put("/exist/:chatId", validateUser, chatController.existGroupChat);
chatRoute.put("/join/:chatId", validateUser, chatController.joinGroupChat);

module.exports = chatRoute;
