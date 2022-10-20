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

const router = express.Router()

router.get('/', findAll)
router.post('/', checkAuth, createProduct)
router.delete('/:productId', checkAuth, deleteProduct)
router.put('/:productId', checkAuth, updateProduct)
router.get('/:productId', findById)
router.get('/name/:productName', findByProductName)
router.get('/category/:category', findByCategory)

export default router
