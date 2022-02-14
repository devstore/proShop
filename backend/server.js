import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

//This enables server to accept data in JSON format from API's clients.
app.use(express.json())

app.get('/api', (req, res) => {
  res.send('API is running...')
})
//Middleware for apis
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

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
