import express from 'express'
import checkAuth from '../middlewares/checkAuth'
import {
  createProduct,
  deleteProduct,
  findAll,
  findByCategory,
  findById,
  findByProductName,
  updateProduct,
} from '../controllers/product.controller'
import checkAdmin from '../middlewares/checkAdmin'

const router = express.Router()

router.get('/', findAll)
router.post('/', checkAdmin, createProduct)
router.delete('/:productId', checkAdmin, deleteProduct)
router.put('/:productId', checkAdmin, updateProduct)
router.get('/:productId', findById)
router.get('/name/:productName', findByProductName)
router.get('/category/:category', findByCategory)

export default router
