const {
  createChatService,
  getChatService,
  getChatByIdService,
  singleChat,
  existgroupChatService,
  joingroupChatService,
} = require("../Services/chat.service");

const createGroupChat = async (req, res) => {
  try {
    let { userId } = req.params;
    let result = await createChatService(req.body, userId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const existGroupChat = async (req, res) => {
  try {
    let { userId, chatId } = req.params;
    let result = await existgroupChatService(chatId, userId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const joinGroupChat = async (req, res) => {
  try {
    let { chatId } = req.params;
    let result = await joingroupChatService(chatId, req.body.userId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const getChats = async (req, res) => {
  try {
    let { userId } = req.params;
    let result = await getChatService(userId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const getChatById = async (req, res) => {
  try {
    let { chatId, userId } = req.params;
    let result = await getChatByIdService(chatId, userId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const getSingleChatBox = async (req, res) => {
  try {
    let { userId, chatUserId } = req.params;
    let result = await singleChat(req.body.chatUserId, userId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = {
  createGroupChat,
  getChats,
  getChatById,
  getSingleChatBox,
  existGroupChat,
  joinGroupChat,
};
