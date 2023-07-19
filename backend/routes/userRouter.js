const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {isAuth, isUnAuth} = require('../middleware/authMiddleware')

router.post('/register', isUnAuth, userController.registerUser);
router.post('/login', isUnAuth, userController.loginUser);
router.get('/me', isAuth, userController.getMe);
router.get('/logout', isAuth, userController.logOut);

router.get('/loginFailure', userController.loginFailure);
router.get('/loginSuccess', isAuth, userController.loginSuccess);

module.exports = router