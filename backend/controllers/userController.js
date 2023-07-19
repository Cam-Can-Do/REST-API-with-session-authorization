const asyncHandler = require('express-async-handler')
const passport = require('passport')
const User = require('../models/userModel')
const genPassword = require('../lib/passwordUtils').genPassword;

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res, next) => {
  
  // TODO: ADD HANDLING FOR EXISTING ACCOUNT

  const {email, password} = req.body;
  
  if (!email || !password) {
    res.status(400);
    throw new Error('Missing field in login.');
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error('Password must be at least 8 characters.');
  }

  // Check for existing user
  const userExists = await User.findOne({email})
  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  // Generate hash and salt from password to be stored.
  const saltHash = genPassword(String(password));
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
      email,
      hash,
      salt,
  });

  try {
    newUser.save().then((user) => {
      res.status(200).json({"message": "Register successful.", "user": user});
    });
  } catch (err) {
    res.status(500).json({"error": err})
  }
});


// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = passport.authenticate('local', {
    failureRedirect: '/api/users/login',  // TODO: Change since we can't GET login
    successRedirect: '/api/strs/',
  });

// TODO: LOGOUT FUNCTION


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.json({message: req.user})
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
