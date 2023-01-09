const User = require('../models/user');
const jwt = require('jsonwebtoken')
const env = require('../config/environment');

module.exports.createUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log(`${req.body.email}: user already exists`);
            return res.json({ success: false, message: "user already exists" });
        } else {
            await User.create(req.body);
            console.log(`new user created :${req.body.email}`);
            return res.json({ success: true, message: "new user created" });
        }
    } catch (error) {
        console.log(`error : `, error);
        return res.json({ success: false, message: `Some Error Detected` });
    }
}

module.exports.signIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log(`user not found`);
            return res.json({ success: false, message: `user not found` });
        }
        if (user.password != req.body.password) {
            console.log(`Incorrect password :${req.body.email}`);
            return res.json({ success: false, message: `Incorrect Password` });
        }
        console.log(`SignIn Successful :${req.body.email}`);
        return res.json({ success: true, data: { token: jwt.sign(user.toJSON(), env.jwt_key, { expiresIn: '10000000' }) } });

    } catch (error) {
        console.log(`error : `, error);
        return res.json({ success: false, message: `Some Error Detected` });
    }
}

module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        if (user) {
            return res.json({ success: true, data: user });
        } else {
            return res.json({ success: false, message: "user not found" })
        }
    } catch (error) {
        console.log(`error : `, error);
        return res.json({ success: false, message: `Some Error Detected` });
    }
}
