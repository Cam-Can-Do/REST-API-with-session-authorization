const mongoose = require('mongoose')

const strSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
      type: String,
      required: [true, 'Please add a str!'],
    },
  },
  {
        timestamps: true,
  }
)

module.exports = mongoose.model('str', strSchema)