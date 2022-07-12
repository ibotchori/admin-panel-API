import express from 'express'
import {
  deleteEmployee,
  getEmployee,
  setEmployee,
  updateEmployee,
} from '../controllers/employeeController'
import authMiddleware from '../middleware/authMiddleware'

const router = express.Router()

router.route('/').post(authMiddleware, setEmployee)
router
  .route('/:id')
  .get(authMiddleware, getEmployee)
  .put(authMiddleware, updateEmployee)
  .delete(authMiddleware, deleteEmployee)

export default router
