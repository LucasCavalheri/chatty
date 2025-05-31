const express = require('express')
const { connectDB } = require('./lib/db')
const authRoutes = require('./routes/auth.routes')
require('dotenv').config()

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
  connectDB()
})
