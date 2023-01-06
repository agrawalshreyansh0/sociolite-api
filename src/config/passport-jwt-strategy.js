const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user'); 
const env = require('./environment');

var opts = { 
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_key
}

passport.use(new JWTStrategy(opts, function (jwt_payload, done) {
    console.log('used strategy'); 
    User.findOne({id:jwt_payload.sub}, function (err, user) {
        if (err) {
            console.log('Error in finding user from JWt');
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

module.exports = passport; 