const ChatRoom = require("../models/chatRoom");
const Message = require("../models/message");

module.exports.getChatRoom = async (req, res) => {
  try {
    let room = await ChatRoom.findOne({
      user1: req.body.user1,
      user2: req.body.user2,
    });

    if (!room) {
      room = await ChatRoom.findOne({
        user1: req.body.user2,
        user2: req.body.user1,
      });
    }

    if (!room) {
      room = await ChatRoom.create(req.body);
    }

    console.log(`chatroom requested by : ${req.body.user1}`);
    res.json({ success: true, data: room });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: `Error Detected` });
  }
};

module.exports.sendMessage = async (req, res) => {
  try {
    await Message.create(req.body);
    res.json({ success: true, message: "message sent" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: `Error Detected` });
  }
};

module.exports.getChats = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const messages = await Message.find({ room: req.query.room })
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.json({ success: true, data: messages });
  } catch (err) {
    console.log(error);
    res.json({ success: false, message: `Error Detected` });
  }
};
