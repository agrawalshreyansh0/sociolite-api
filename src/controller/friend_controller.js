const User = require("../models/user");

module.exports.sendRequest = async (req, res) => {
  try {
    const user = await User.findById(req.body.recieverId);
    const sender = await User.findById(req.body.senderId);
    user.requestsRecieved.push(sender._id);
    sender.requestsSent.push(user._id);
    user.save();
    sender.save();
    console.log(`request sent from :${sender.id} to ${user.id}`);
    return res.json({ success: true, message: "request sent" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error Detected" });
  }
};

module.exports.unfriend = async (req, res) => {
  try {
    // do this now
    const user = await User.findById(req.body.senderId);
    const reciever = await User.findById(req.body.recieverId);
    user.friends.pull(reciever._id);
    reciever.friends.pull(user._id);
    user.save();
    reciever.save();
    console.log(`${user.id} unfriended ${reciever.id} `);
    return res.json({ success: true, message: `Unfriended successfully` });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error Detected" });
  }
};

module.exports.acceptRequest = async (req, res) => {
  try {
    const reciever = await User.findById(req.body.recieverId)
      .populate("requestsRecieved")
      .exec();
    const sender = await User.findById(req.body.senderId)
      .populate("requestsSent")
      .exec();
    reciever.requestsRecieved.pull(sender._id);
    sender.requestsSent.pull(reciever._id);
    reciever.friends.push(req.body.senderId);
    sender.friends.push(req.body.recieverId);
    reciever.save();
    sender.save();
    console.log(`friend request accepted by :${reciever.id} from ${sender.id}`);
    return res.json({ success: true, message: "request accepted" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error Detected" });
  }
};

module.exports.deleteRequest = async (req, res) => {
  try {
    const reciever = await User.findById(req.body.recieverId)
      .populate("requestsRecieved")
      .exec();
    const sender = await User.findById(req.body.senderId)
      .populate("requestsSent")
      .exec();
    reciever.requestsRecieved.pull(sender._id);
    sender.requestsSent.pull(reciever._id);
    reciever.save();
    sender.save();
    console.log(`friend request deleted by :${reciever.id} from ${sender.id}`);
    return res.json({ success: true, message: "request deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error Detected" });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).populate("friends").exec();
    console.log(`user requested`);
    return res.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error Detected" });
  }
};
