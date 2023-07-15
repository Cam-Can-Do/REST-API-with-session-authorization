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
    },
    salt: {
      type: String
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