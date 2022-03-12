import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

//This enables server to accept data in JSON format from API's clients.
app.use(express.json())

//Middleware for apis
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID),
)

//Making the folder static so that it is accessible to the application
const __dirname = path.resolve()
console.log(`__dirname=${__dirname}`)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//For Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

//This is to see the logging of all http calls in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

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
