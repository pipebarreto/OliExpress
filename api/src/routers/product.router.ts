import express from 'express'
import {
  createProduct,
  deleteProduct,
  findAll,
  findById,
  updateProduct,
} from '../controllers/product.controller'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.post('/', createProduct)
router.delete('/:productId', deleteProduct)
router.put('/:productId', updateProduct)
router.get('/:productId', findById)
//router.post('/', createProduct)

export default router
