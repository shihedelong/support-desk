const experss = require('express')
const router = experss.Router()
const { getTickets, createTicket } = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTickets).post(protect, createTicket)

module.exports = router
