import express from 'express'
import {
  setCompany,
  getCompanies,
  getCompany,
  updateCompanies,
  deleteCompanies,
} from '../controllers/companyController'
import authMiddleware from '../middleware/authMiddleware'

const router = express.Router()

router
  .route('/')
  .post(authMiddleware, setCompany)
  .get(authMiddleware, getCompanies)
router
  .route('/:id')
  .get(authMiddleware, getCompany)
  .put(authMiddleware, updateCompanies)
  .delete(authMiddleware, deleteCompanies)

export default router
