import express from "express"
import protectRoute from '../middlewares/protectRoute.js'
import { getMe, login, logout, signUp } from '../controllers/auth.controllers.js'

const router = express.Router()

/* GET routes */
// Get current authenticated user's data
router.get('/me', protectRoute, getMe)

/* POST routes */
// Create new user
router.post("/signup", signUp)
// User login
router.post("/login", login)
// User logout
router.post("/logout", logout)


export default router