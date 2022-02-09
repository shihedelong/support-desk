const path = require('path')
const express = require('express')
const colors = require('colors')
const { message } = require('statuses')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()

//Connect to database
connectDB()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Route
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  )
} else {
  app.get('/', (req, res) =>
    res.status(200).json({ message: 'Welcome to Json message' })
  )
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
