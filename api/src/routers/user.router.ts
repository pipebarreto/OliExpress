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

router.get('/', findAll)
router.post('/', createUser)
router.delete('/:userId', deleteUser)
router.put('/:userId', updateUser)
router.get('/:userId', findById)

export default router
