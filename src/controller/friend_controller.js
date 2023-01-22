const User = require('../models/user');


module.exports.sendRequest = async (req, res) => {
    try {
        const user = await User.findById(req.body.recieverId);
        user.requestRecieved.push(req.body.senderId);
        user.save();
        const sender = await User.findById(req.body.senderId);
        sender.requestsSent.push(req.body.recieverId);
        sender.save();
        console.log(`request sent from :${sender.email} to ${reciever.email}`);
        return res.json({ success: true, message: "request sent" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error Detected" });
    }
}

module.exports.acceptRequest = async (req, res) => {
    try {
        const reciever = await User.findById(req.body.recieverId);
        const sender = await User.findById(req.body.senderId); 
        reciever.requestRecieved.pull(req.body.senderId);
        reciever.friends.add(req.body.senderId);
        reciever.save();
        sender.requestsSent.pull(req.body.recieverId);
        sender.friends.add(req.body.recieverId);
        sender.save();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error Detected" });
    }
}