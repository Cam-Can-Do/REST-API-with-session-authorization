const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {isAuth, isUnAuth, isAdmin} = require('../middleware/authMiddleware')

/*
router.get('/register', isUnAuth, (req, res) => {
    res.render('register.ejs')
  })
*/

router.post('/register', userController.registerUser)

/*
router.get('/login', isUnAuth, (req, res) => {
    res.render('login.ejs')
  })
*/
router.post('/login', userController.loginUser);

/*
router.get('/me', isAuth, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
*/
router.get('/me', isAuth, userController.getMe)

module.exports = router
