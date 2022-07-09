import express, { json } from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import YAML from 'yamljs'
import swaggerUI from 'swagger-ui-express'
import userRouter from './routes/userRoutes'
import companyRouter from './routes/companyRoute'
import { errorHandler } from './middleware/errorMiddleware'
import connectDB from './config/db'

/**
 * Load swagger document.
 */
const swaggerDocument = YAML.load('./src/config/swagger.yaml')

dotenv.config()

const app = express()
// Connect to mongo database
connectDB()

/**
 * Setting up swagger middleware.
 */
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Middleware
app.use(json()) // <-- body parser
app.use(express.urlencoded({ extended: false })) // <-- url encode

const PORT = process.env.SERVER_PORT || 4000

/*  Routes */
app.use('/', userRouter)
app.use('/api/companies', companyRouter)

// overwrite the default express error handler with custom error handler middleware
app.use(errorHandler) // <-- error handler middleware

/* Server */
app.listen(PORT, () => console.log(`App listening at port ${PORT}`))
