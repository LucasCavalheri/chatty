const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    profilePic: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
