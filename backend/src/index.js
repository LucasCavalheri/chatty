const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const { connectDB } = require('./lib/db')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
  connectDB()
})
