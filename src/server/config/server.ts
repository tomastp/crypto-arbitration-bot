import express from 'express'
import morganMiddleware from '../middleware/morgan-middleware'
import dotenv from 'dotenv'
import { env } from '../environment/env'

// instance application
const app  = express()

// .env configuration
dotenv.config()

// set port
const port: number = env().port ?? 8000
app.set('port', port)

// use Morgan middleware log request
app.use(morganMiddleware)

// use json
app.use(express.json())

export default app