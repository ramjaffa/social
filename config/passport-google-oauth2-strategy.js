const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');
// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"944773230108-tms7n0jd1lnni514tnf6vs9fftpq3fb4.apps.googleusercontent.com",
        clientSecret:"jwrJHrx7GQD3WcteD6jrD3Wq",
        callbackURL:"http://localhost:8000/users/auth/google/callback",
},
    function(accessToken, refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec((function(err,user){
            if(err){console.log('error in google strategy-passport',err); return;}

            console.log(profile);

            if(user){
                // if found set this user as req.user
                return done(null,user);
            }
            else{
                // if not foujnd, create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){console.log('error in google strategy-passport',err); return;}
                    
                    return done(null,user);
                })
            }
        }))
    }
));

module.exports = passport;