const JwtStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');

const User = mongoose.model('users');

const keys = require('../config/keys.js');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        console.log(jwt_payload);

        User.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    //no error, return done with user
                    return done(null, user);
                }
                //no error but no user either
                return done(null, false);
            })
            .catch(err => {
                console.log(err)
            });
    }));
};