const express = require('express')
const router = express.Router()
const {isAuth, isAdmin} = require('../middleware/authMiddleware')

const {
    registerUser,
    loginUser,
    loginSuccess,
    loginFailure,
    getMe,
} = require('../controllers/userController')


router.post('/', registerUser)

router.post('/login', loginUser);

router.get('/me', isAuth, getMe)

module.exports = router
