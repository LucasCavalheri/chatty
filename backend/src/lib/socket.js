const { Server } = require('socket.io')
const http = require('node:http')
const express = require('express')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://192.168.15.10:5173', 'http://172.17.16.1:5173']
  }
})

const getReceiverSocketId = (userId) => {
  return userSocketMap[userId]
}

const userSocketMap = {}

io.on('connection', (socket) => {
  console.log('a user connected: ', socket.id)
  const userId = socket.handshake.query.userId

  if (userId) userSocketMap[userId] = socket.id

  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  socket.on('disconnect', () => {
    console.log('a user disconnected: ', socket.id)
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

module.exports = { io, app, server, getReceiverSocketId }
