const User = require('../models/user');


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
}

module.exports.acceptRequest = async (req, res) => {
    try {
        const reciever = await User.findById(req.body.recieverId)
            .populate('requestsRecieved')
            .exec();
        const sender = await User.findById(req.body.senderId)
            .populate('requestsSent')
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
}

module.exports.deleteRequest = async (req, res) => {
    try {
        const reciever = await User.findById(req.body.recieverId)
            .populate('requestsRecieved')
            .exec();
        const sender = await User.findById(req.body.senderId)
            .populate('requestsSent')
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
}