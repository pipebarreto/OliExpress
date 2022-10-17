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

router.get('/', findAll)
router.post('/', createOrder)
router.delete('/:orderId', deleteOrder)
router.put('/:orderId', updateOrder)
router.get('/:orderId', findById)

export default router
