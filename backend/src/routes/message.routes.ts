import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { getMessages, getSidebarUsers, sendMessage } from "../controllers/message.controllers.js"

const router = express.Router()

/* GET routes */
// Get conversations
router.get('/conversations-list', protectRoute, getSidebarUsers)
// Get messages by user id
router.get('/:id', protectRoute, getMessages)

/* POST routes */
// Sending a message
router.post('/send/:id', protectRoute, sendMessage)


export default router