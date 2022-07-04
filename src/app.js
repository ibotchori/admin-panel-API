import express, { json } from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes'
import { errorHandler } from './middleware/errorMiddleware'

dotenv.config()

const app = express()

// Middleware
app.use(json()) // <-- body parser
app.use(express.urlencoded({ extended: false })) // <-- url encode

const PORT = process.env.SERVER_PORT || 4000

/*  Routes */
app.use('/', userRouter)

// overwrite the default express error handler with custom error handler middleware
app.use(errorHandler) // <-- error handler middleware

/* Server */
app.listen(PORT, () => console.log(`App listening at port ${PORT}`))
