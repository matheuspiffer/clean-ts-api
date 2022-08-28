import express from 'express'
import setupMiddlares from './middlewares'

const app = express()
setupMiddlares(app)

export default app
