const User = require('../models/user.model')
const cloudinary = require('../lib/cloudinary')
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    generateToken(user._id, res)

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic
    })
  } catch (error) {
    console.log('Error in login controller', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const logout = (_req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 })

    return res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.log('Error in logout controller', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body
    const userId = req.user._id

    if (!profilePic) {
      return res.status(400).json({ message: 'Profile picture is required' })
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic)

    const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.log('Error in updateProfile controller', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log('Error in checkAuth controller', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = { signup, login, logout, updateProfile, checkAuth }
