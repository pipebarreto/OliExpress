import express from 'express'
import {
  createOrder,
  deleteOrder,
  findAll,
  findById,
  updateOrder,
} from '../controllers/order.controller'
import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', checkAuth, findAll)
router.post('/', createOrder)
router.delete('/:orderId', deleteOrder)
router.put('/:orderId', updateOrder)
router.get('/:orderId', findById)
//router.post('/', createProduct)

export default router
