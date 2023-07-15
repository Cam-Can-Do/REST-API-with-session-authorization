const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {

    if (req.session.user) {
        // User is authenticated, proceed to the next middleware or route handler
        next();
    } else {
        // User is not authenticated, redirect or send an error response
        // res.redirect('/login');
        res.status(401)
        throw new Error('Unauthorized.')
    }
});

module.exports = { protect };
