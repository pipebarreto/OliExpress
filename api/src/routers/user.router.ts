import express from 'express'
import checkAdmin from '../middlewares/checkAdmin'
import {
  createUser,
  deleteUser,
  findAll,
  findById,
  updateUser,
} from '../controllers/user.controller'

const router = express.Router()

router.get('/', findAll)
router.post('/', createUser)
router.delete('/:userId', checkAdmin, deleteUser)
router.put('/:userId', updateUser)
router.get('/:userId', findById)

export default router
