import express from 'express'
import { getUser, login, register } from '../controllers/userController'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/user', getUser)

export default router
