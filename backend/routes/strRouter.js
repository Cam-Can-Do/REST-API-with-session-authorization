const express = require('express')
const router = express.Router()
const {isAuth, isUnAuth, isAdmin} = require('../middleware/authMiddleware')

const {
    getStrs,
    setStr,
    updateStr,
    deleteStr,
} = require('../controllers/strController')


router.route('/').get(isAuth, getStrs).post(isAuth, setStr)
router.route('/:id').put(isAuth, updateStr).delete(isAuth, deleteStr)

module.exports = router