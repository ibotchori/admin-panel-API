import express from 'express'
import { getEmployee, setEmployee } from '../controllers/employeeController'
import authMiddleware from '../middleware/authMiddleware'

const router = express.Router()

router.route('/').post(authMiddleware, setEmployee)
router.route('/:id').get(authMiddleware, getEmployee)

export default router
