const User = require('../models/user.model')
const { generateToken } = require('../lib/utils')

const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' })
    }

    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const newUser = new User({ fullName, email, password })

    if (newUser) {
      generateToken(newUser._id, res)
      await newUser.save()

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic
      })
    } else {
      return res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    console.log('Error in signup controller', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const login = (req, res) => {}

const logout = (req, res) => {}

module.exports = { signup, login, logout }
