import { config } from 'dotenv'
config();

import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import Deck from './models/Deck';

const PORT = 5001

const app = express()
app.use(express.json())
app.use(cors())
app.get('/', (req: Request, res: Response) => {
  res.send('hello world')
})

app.get('/decks', async (req: Request, res: Response) => {
  const decks = await Deck.find({})
  res.json(decks)
})

app.post('/decks', async (req: Request, res: Response) => {
  const body = req.body
  console.log(req.body)
  
  const newDeck = new Deck({
    title: body.title
  })
  
  const createdDeck = await newDeck.save()
  res.json(createdDeck)
})

const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`litening to the port ${PORT}`)
    app.listen(PORT)
  }).catch(e => {
    console.log("error: " + e)
  })

