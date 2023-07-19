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
    res.status(500).json({"error": err});
  }
});


// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = passport.authenticate('local', {
    failureRedirect: '/api/users/loginFailure',  
    successRedirect: '/api/users/loginSuccess',
  });

// @desc    Redirect for unsuccessful login
// @route   GET /api/users/loginFailure
// @access  Public
const loginFailure = (req, res, next) => {
  console.log('FAILURE!!')
  res.status(401).json({message:'Invalid login.'});
};

// @desc    Redirect for successful login
// @route   GET /api/users/loginSuccess
// @access  Private
const loginSuccess = (req, res, next) => {
  res.status(200).json({message: "Login successful"});
};


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.json({message: req.user});
})

// @desc    Logout user
// @route   GET /api/users/logout
// @access  Public
const logOut = (req, res, next) => {
	res.clearCookie('connect.sid'); 
	req.logout(function(err) {
		console.log(err)
		req.session.destroy(function (err) { // destroys the session
		res.status(200).json({message:"Successfully logged out."})
		});
	});
};

module.exports = {
    registerUser,
    loginUser,
    loginSuccess,
    loginFailure,
    getMe,
    logOut,
}
