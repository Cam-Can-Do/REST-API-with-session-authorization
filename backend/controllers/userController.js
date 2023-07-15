const asyncHandler = require('express-async-handler')
const passport = require('passport')
const User = require('../models/userModel')
const genPassword = require('../lib/passwordUtils').genPassword;

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res, next) => {
  
  // TODO: ADD HANDLING FOR EXISTING ACCOUNT


  const saltHash = genPassword(String(req.body.password));
  
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
      email: req.body.email,
      hash: hash,
      salt: salt,
  });

  newUser.save()
      .then((user) => {
          console.log(user);
      });

  // res.redirect('/login');
  //res.status(200).json({"message": "User successfully registered"})
  res.redirect('/api/users/login')
});


// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = passport.authenticate('local', {
    failureRedirect: '/api/users/login',
    successRedirect: '/api/users/me',
  });




// TODO: LOGOUT FUNCTION

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.json({message: "My protected route!"})
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
}