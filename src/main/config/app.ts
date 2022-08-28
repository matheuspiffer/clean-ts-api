import express from 'express'
import setupMiddlares from './middlewares'
import setupRoutes from './routes'

const app = express()
setupMiddlares(app)
setupRoutes(app)

export default app
