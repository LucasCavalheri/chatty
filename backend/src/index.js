const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const messageRoutes = require('./routes/message.routes')
const { app, server } = require('./lib/socket')
const { connectDB } = require('./lib/db')
require('dotenv').config()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://172.17.16.1:5173'],
    credentials: true
  })
)

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
  connectDB()
})
