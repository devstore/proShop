import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

//@desc Fetch All products
//@route GET /api/products
//@access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    //  throw new Error('Some error')
    res.json(products)
  }),
)

//@desc Fetch single product
//@route GET /api/product/:id
//@access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  }),
)

export default router
