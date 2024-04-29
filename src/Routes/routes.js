const express = require("express");
const userRoute = require("./users");
const chatRoute = require("./chats");
const messageRoute = require("./messages");
const router = express.Router();

router.use("/user", userRoute);
router.use("/chat", chatRoute);
router.use("/message", messageRoute);

module.exports = router;
