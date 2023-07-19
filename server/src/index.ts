import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import Deck from './models/Deck';

const PORT = 5000

const app = express()
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
  res.send('hello world')
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

const db = mongoose.connect(
  'mongodb+srv://fullstack:MIQeCX7xhM65ZvmK@phonebook.rngmcxx.mongodb.net/deck?retryWrites=true&w=majority'
  ).then(() => {
    console.log(`litening to the port ${PORT}`)
    app.listen(PORT)
  })

