const express = require('express')
const router = express.Router()
const {isAuth, isUnAuth, isAdmin} = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')

router.get('/register', isUnAuth, (req, res) => {
    res.render('register.ejs')
  })
router.post('/register', userController.registerUser)

router.get('/login', isUnAuth, (req, res) => {
    res.render('login.ejs')
  })
router.post('/login', userController.loginUser);

router.get('/me', isAuth, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
//router.get('/me', isAuth, userController.getMe)

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/api/users/login')
  })

module.exports = router
