const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized.' });
    }
}

const isUnAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(400).json({message:'Already signed in.'}).redirect('/')
    }
    next()
}

module.exports = {isAuth, isUnAuth}