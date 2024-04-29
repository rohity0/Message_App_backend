const {
  createMessageService,
  getAllMessagesService,
} = require("../Services/message.service");

const createMessage = async (req, res) => {
  try {
    let { userId } = req.params;
    let result = await createMessageService(req.body, userId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const getAllMessages = async (req, res) => {
  try {
    let { chatId } = req.params;
    let result = await getAllMessagesService(chatId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = {
  createMessage,
  getAllMessages,
};
