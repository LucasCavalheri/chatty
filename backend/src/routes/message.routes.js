const { Router } = require('express')
const { protectRoute } = require('../middlewares/auth.middleware')
const { getUsersForSidebar, getMessages, sendMessage } = require('../controllers/message.controller')

const router = Router()

router.get('/users', protectRoute, getUsersForSidebar)
router.get('/:id', protectRoute, getMessages)

router.post('/send/:id', protectRoute, sendMessage)

module.exports = router
