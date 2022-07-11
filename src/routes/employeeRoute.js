import express from 'express'
import { setEmployee } from '../controllers/employeeController'
import authMiddleware from '../middleware/authMiddleware'

const router = express.Router()

router.route('/').post(authMiddleware, setEmployee)

export default router
