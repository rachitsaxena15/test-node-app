const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
passport.serializeUser( (user, done)=> {
    done(null, user.id);
});

passport.deserializeUser( (id, done)=> {
    User.findById(id)
        .then( user => {
            done(null, user);
        });
});
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then( (existingUser)=> {
            if(existingUser){
                //we already have this user registered with us.
                // passport.serializeUser(function(existingUser, done) {
                //     done(null, existingUser);
                //   });
                //passport.deserializeUser(function(existingUser, done) {
                //    done(null, existingUser);
                // });
                done(null, existingUser);
            } else{
                new User({googleId: profile.id})
                    .save()
                    .then(user => done(null, existingUser));
                    // .then(passport.serializeUser(function(existingUser, done) {
                    //     done(null, existingUser);
                    //   }));
            }
        })
        .catch((err) => {console.log('err = ' + err)});
    })
);