const experss = require('express')
const router = experss.Router()
const { registerUser, loginUser } = require('../controllers/userController')

router.post('/', registerUser)

router.post('/login', loginUser)

module.exports = router
