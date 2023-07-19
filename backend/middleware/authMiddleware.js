const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).json({ message: 'Not authorized.' });
    }
}

const isUnAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(400).json({message:'Already signed in.'});
    } else {
        next()
    }
}

module.exports = {isAuth, isUnAuth}