const jwt = require('jsonwebtoken');
const env = require("./environment");
const User = require("../models/user");

const auth = async (req, res, next) => {

    console.log("auth tapped"); 

    try {


        const token = req.header("authToken");
        if (!token) return res.json({ success: false, message: "No auth token found, access denied" });

        const verified = jwt.verify(token, env.jwt_key);
        if (!verified) return res.json({ success: false, message: "Incorrect jwt token" });

        const user = await User.findById(verified.id);
        if (!user) return res.json({ success: false, message: "User not found" });

        req.user = verified.id;
        req.token = token;

        next();
    } catch (error) {
        console.log(error); 
      return  res.json({ success: false, message: "Error in authorization" });
    }
}

module.exports = auth; 
