/* MODULES IMPORTS */
import express from 'express'
import dotenv from 'dotenv'
import prisma from './config/prisma.js'
import cookieParser from 'cookie-parser'
import { validateEnvVariables } from './utils/validateEnvVariables.js'

/* ROUTES IMPORTS */
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'

/* ENVIRONMENT SETUP */
// Making environment variables available throughout the app
dotenv.config()
// Validating environment variables
validateEnvVariables()

/* EXPRESS APP */
const app = express()
const PORT: number = Number(process.env.PORT || 5000)

/* MIDDLEWARES */
// For parsing cookies
app.use(cookieParser())
// For parsing application/json
app.use(express.json())

/* ROUTES */
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

/* SERVER LISTENER */
const startServer = async (): Promise<void> => {
  // Attempting to connect to DB & start the server
  try {
    await prisma.$connect()
    console.log('Database successfully connected')
    app.listen(PORT, ()=> {
      console.log(`Server listening on port ${PORT}...`)
    })
  } catch(error: any) {
    console.error(`Error while attempting to connect to the database: ${error.message || error}`)
    process.exit(1)
  }
}

startServer()