import express from 'express'
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
//Checking if user is logged in and has admin permissions
router.route('/').get(protect, admin, getUsers)
router.post('/login', authUser)

/*
Below shows /profile route has a get function and a put function.
Based on the call corresponding method will be called
*/
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)

router.route('/:id').delete(protect, admin, deleteUser)
router.route('/:id').get(protect, admin, getUserById)
router.route('/:id').put(protect, admin, updateUser)

export default router
