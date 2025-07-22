import express from 'express'
import { getuser, login, logout, signup, updateuser } from '../controllers/user.js'
import { authenticate } from '../middleware/auth.js'
const router = express.Router()

router.post('/update-user',authenticate, updateuser)
router.get('/users', authenticate, getuser)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

export default router