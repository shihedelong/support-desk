const express = require('express')
const { message } = require('statuses')
const dotenv = require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8000

app.get('/', (req, res) =>
  res.status(200).json({ message: 'Welcome to Json message' })
)

app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
