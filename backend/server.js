const express = require('express')
const { message } = require('statuses')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) =>
  res.status(200).json({ message: 'Welcome to Json message' })
)

// Route
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
