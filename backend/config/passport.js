const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel')
const validPassword = require('../lib/passwordUtils').validPassword;

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = (email, password, done) => {

    User.findOne({ email })
        .then((user) => {

            if (!user) { 
                console.log("user not found in passport!");
                return done(null, false); }

            
            const isValid = validPassword(password, user.hash, user.salt);
            
            if (isValid) {
                console.log("passport says valid password")
                return done(null, user);
            } else {
                console.log("passport says INvalid password")
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
