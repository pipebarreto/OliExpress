import express from 'express'
import {
  createUser,
  deleteUser,
  findAll,
  findById,
  updateUser,
} from '../controllers/user.controller'
import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.post('/', createUser)
router.delete('/:userId', deleteUser)
router.put('/:userId', updateUser)
router.get('/:userId', findById)
//router.post('/', createProduct)

export default router
