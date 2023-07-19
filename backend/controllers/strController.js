const asyncHandler = require('express-async-handler')
const Str = require('../models/strModel')
const User = require('../models/userModel')

const getStrs = asyncHandler(async(req, res) => {
    const strs = await Str.find({user: req.user.id})
    res.status(200).json(strs)
})

const setStr = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please enter a str!')
    }

    const str = await Str.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(str)
})

const updateStr = asyncHandler(async(req, res) => {
    const str = await Str.findById(req.params.id)

    if (!str) {
        res.status(400)
        throw new Error('Str not found.')
    }

    // Actually needed? why only here?
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (str.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    if (!req.body.text) {
        res.status(400)
        throw new Error('Please enter text to update the str.')
    }

    const updatedstr = await Str.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedstr)
})

const deleteStr = asyncHandler(async(req, res) => {
    const str = await Str.findById(req.params.id)

    if (!str) {
        res.status(400)
        throw new Error('Str not found.')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

  // Make sure the logged in user matches the str user
  if (str.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await str.deleteOne()

  res.status(200).json({id: req.params.id})
})

module.exports = {
    getStrs,
    setStr,
    updateStr,
    deleteStr
}