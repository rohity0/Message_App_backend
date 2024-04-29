const ChatModel = require("../models/ChatSchema");
const MessageModel = require("../models/MessageSchema");
const UserModel = require("../models/UserSchema");
const { encrypt, decrypt } = require("../utils/crypto");

const createMessageService = async (data, userId) => {
  try {
    data.sender = userId;
    data.content = encrypt(data.content);
    let message = await MessageModel.create(data);
    message = await message.populate("sender");
    message = await message.populate("chat");
    message = await UserModel.populate(message, { path: "chat.users" });
    await ChatModel.findByIdAndUpdate(data.chat, {
      latestMessage: message,
    }).catch((err) => console.log(err));
    return message;
  } catch (err) {
    throw err;
  }
};

const getAllMessagesService = async (chatId) => {
  try {
    let message = await MessageModel.find({ chat: chatId }).populate("sender");
    return message.map((item) => {
      let messageDecode = decrypt(item.content);
      item.content = messageDecode;
      return item;
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createMessageService,
  getAllMessagesService,
};
