import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.get('/api', (req, res) => {
  res.send('API is running...')
})
//Middleware for prodcuts apis
app.use('/api/products', productRoutes)

//Middleware for handling bad URLs
app.use(notFound)

//error handler middleware
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}.`.yellow
      .bold,
  ),
)
