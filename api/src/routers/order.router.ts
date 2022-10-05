import express from 'express'
import {
  createOrder,
  deleteOrder,
  findAll,
  findById,
  updateOrder,
} from '../controllers/order.controller'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.post('/', createOrder)
router.delete('/:productId', deleteOrder)
router.put('/:productId', updateOrder)
router.get('/:productId', findById)
//router.post('/', createProduct)

export default router
