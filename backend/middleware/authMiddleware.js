const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ message: 'You are not authorized to view this resource' });
    }
}

const isUnAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json({ message: 'You are not authorized to view this resource because you are not an admin.' });
    }
}

module.exports = {isAuth, isUnAuth, isAdmin}