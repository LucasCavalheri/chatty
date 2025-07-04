const Message = require('../models/message.model')
const User = require('../models/user.model')
const cloudinary = require('../lib/cloudinary')
const { getReceiverSocketId, io } = require('../lib/socket')

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')

    return res.status(200).json(filteredUsers)
  } catch (error) {
    console.log('Error in getUsersForSidebar controller', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const myId = req.user._id

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId }
      ]
    })

    return res.status(200).json(messages)
  } catch (error) {
    console.log('Error in getMessages controller', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id

    let imageUrl
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    })

    await newMessage.save()

    const receiverIdSocketId = getReceiverSocketId(receiverId)

    if (receiverIdSocketId) {
      io.to(receiverIdSocketId).emit('newMessage', newMessage)
    }

    return res.status(201).json(newMessage)
  } catch (error) {
    console.log('Error in sendMessage controller', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = { getUsersForSidebar, getMessages, sendMessage }
