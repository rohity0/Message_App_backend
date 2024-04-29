const bcrypt = require("bcrypt");
const ChatModel = require("../models/ChatSchema");
const { commonErrorHandling } = require("../utils/error-response");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserSchema");
const { Types } = require("mongoose");

//Create  Group-Chat
const createChatService = async (data, userId) => {
  try {
    if (!data.users && !data.users.length > 0) {
      commonErrorHandling(400, "Invalid Data Format");
    }
    let users = data.users;
    users.push(userId);

    var chatData = {
      users: users,
      isGroupChat: true,
    };
    return await ChatModel.create(chatData);
  } catch (err) {
    throw err;
  }
};

//exist chat
const existgroupChatService = async (chatId, userId) => {
  try {
    let chat = await ChatModel.findOne({
      _id: chatId,
      isGroupChat: true,
      users: { $elemMatch: { $eq: userId } },
    });
    if (chat) {
      return ChatModel.findByIdAndUpdate(chatId, { $pull: { users: userId } });
    }
  } catch (err) {
    throw err;
  }
};

//join group chat
const joingroupChatService = async (chatId, userId) => {
  try {
    let chat = await ChatModel.findOne({
      _id: chatId,
      isGroupChat: true,
      users: { $elemMatch: { $eq: userId } },
    });
    if (!chat) {
      return ChatModel.findByIdAndUpdate(chatId, {
        $addToSet: { users: userId },
      });
    }
  } catch (err) {
    throw err;
  }
};

// GET ALL Chats by USERID
const getChatService = async (userId) => {
  try {
    let data = ChatModel.find({
      users: { $elemMatch: { $eq: userId } },
    })
      .populate("users")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        return (results = await UserModel.populate(results, {
          path: "latestMessage.sender",
        }));
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });

    return data;
  } catch (err) {
    throw err;
  }
};

// GET Chat by ChatId
const getChatByIdService = async (chatId, userId) => {
  try {
    return await ChatModel.findOne({
      _id: chatId,
      users: { $elemMatch: { $eq: userId } },
    }).populate("users");
  } catch (err) {
    throw err;
  }
};

//create singleChat
const singleChat = async (chatUserId, userId) => {
  return await ChatModel.findOneAndUpdate(
    {
      isGroupChat: false,
      users: {
        $size: 2,
        $all: [
          { $elemMatch: { $eq: new Types.ObjectId(chatUserId) } },
          { $elemMatch: { $eq: new Types.ObjectId(userId) } },
        ],
      },
    },
    {
      $setOnInsert: {
        users: [chatUserId, userId],
      },
    },
    {
      new: true,
      upsert: true,
    }
  ).populate("users");
};

module.exports = {
  createChatService,
  getChatService,
  getChatByIdService,
  singleChat,
  existgroupChatService,
  joingroupChatService,
};
