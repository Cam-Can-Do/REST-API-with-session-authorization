const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validPassword = require('../lib/passwordUtils').validPassword;

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = asyncHandler(async(email, password, done) => {
    const user = await User.findOne({email})
    // No user registered with inputted email.
    if (!user) { 
        return done(null, false);
    }
    const isValid = validPassword(password, user.hash, user.salt);
    // Successful login.
    if (isValid) {
        user.consecFailedLogins = 0;
        user.save();
        return done(null, user);
    // Failed login.
    } else { 
        user.consecFailedLogins++;
        user.save();
        return done(null, false);
    }
})

const local_strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(local_strategy);

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

