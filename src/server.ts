import express from 'express'
import cors from 'cors'
import storiesRoutes from './routes/storiesRoutes.js'
import storeRoutes from './routes/storeRoutes.js'

const app = express()

// Middlewares
app.use(cors('*'))
app.use(express.json())

// Routes
app.use('/api/store', storeRoutes)
app.use('/api/stories', storiesRoutes)

// PORT
const PORT = process.env.PORT || 3001

// serve the port
app.listen(PORT, () => console.log('server is running at :', PORT))