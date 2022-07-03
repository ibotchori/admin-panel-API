import express, { json } from 'express'
import dotenv from 'dotenv'
import items from './items'

dotenv.config()

const app = express()
app.use(json())

const PORT = process.env.SERVER_PORT || 4000

/*  Routes */
app.get('/', async (req, res) => {
  res.json({ status: true, message: 'Our node.js app works' })
})

app.get('/items', (req, res) => {
  res.json({ status: true, message: 'Fetched all items', data: items })
})

/* Server */
app.listen(PORT, () => console.log(`App listening at port ${PORT}`))
