const User = require('../models/user');
const jwt = require('jsonwebtoken')
const env = require('../config/environment');
const bcrypt = require('bcrypt');


//Important for the api
module.exports.createUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log(`${req.body.email}: user already exists`);
            return res.json({ success: false, message: "Account already exists" });
        } else {
            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, env.bcrypt_salt);
            await User.create({ email: req.body.email, password: hashedPassword, name: req.body.name });
            console.log(`new user created :${req.body.email}`);
            return res.json({ success: true, message: "Account Created Login with the same Credentials" });
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
        if (!await bcrypt.compare(req.body.password, user.password)) {
            console.log(`Incorrect password :${req.body.email}`);
            return res.json({ success: false, message: `Incorrect Password` });
        }
        console.log(`SignIn Successful :${req.body.email}`);
        return res.json({ success: true, message: "User Successfully logged in", data: { token: jwt.sign({ id: user._id }, env.jwt_key, { expiresIn: env.jwt_expiry }), userdata: user } });

    } catch (error) {
        console.log(`error : `, error);
        return res.json({ success: false, message: `Some Error Detected` });
    }
}

module.exports.getUserData = async (req, res) => {
    try {
        const founduser = await User.findById(req.user);
        return res.json({ success: true, data: founduser });
    } catch (error) {
        console.log(`error : `, error);
        return res.json({ success: false, message: `Some Error Detected` })
    }
}

module.exports.validateToken = async (req, res) => {
    console.log("verified"); 
    return res.json({ success: true }); 
}

module.exports.updateUser = async (req, res) => {
    try {
        const founduser = await User.findById(req.body.id); 
        if (!founduser) {
            console.log(`user not found`); 
            return res.json({ success: false, message: "user not found" }); 
        }
        founduser.name = req.body.name; 
        founduser.email = req.body.email; 
        founduser.avatar = req.body.avatar; 
        founduser.save(); 
        console.log(`user updated : ${req.body.id}`); 
        return res.json({ success: true, message: "User updated" }); 
    } catch (error) {
        console.log(error); 
        return res.json({ success:false, message})
    }
}

//Extras for testing
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

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        console.log(`All Users`);
        return res.json({ success: true, data: users });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error Detected" });
    }
}