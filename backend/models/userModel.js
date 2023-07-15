const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    hash: {
      type: String,
      required: [true, 'Password hash was not generated']
    },
    salt: {
      type: String,
      required: [true, 'Password salt was not generated']
    },
    admin: {
      type: Boolean
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)