import express from 'express'
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

/*
Below shows /profile route has a get function and a put function.
Based on the call corresponding method will be called
*/

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
export default router
