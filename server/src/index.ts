import { config } from 'dotenv'
config();

import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import Deck from './models/Deck';
import decksRouter from './controllers/decks';

const PORT = 5001

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('hello world')
})

app.use('/decks', decksRouter)

const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`litening to the port ${PORT}`)
    app.listen(PORT)
  }).catch(e => {
    console.log("error: " + e)
  })

