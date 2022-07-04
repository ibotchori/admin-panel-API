import express from 'express'
import { getUser, login, register } from '../controllers/userController'
import authMiddleware from '../middleware/authMiddleware'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/user', authMiddleware, getUser)

export default router
