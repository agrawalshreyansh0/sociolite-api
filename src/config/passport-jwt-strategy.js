const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const user = require('../models/user')
const env = require('./environment'); 

var opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_key
 }

 passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne(jwt_payload._id, function(err, user) {
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

modules.export = passport; 


