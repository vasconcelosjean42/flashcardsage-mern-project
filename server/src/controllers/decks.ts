import {Request, Response, Router} from 'express'
import Deck from '../models/Deck';

const decksRouter = Router()

decksRouter.get('/', async (req: Request, res: Response) => {
    const decks = await Deck.find({})
    res.json(decks)
  }
)

decksRouter.post('/', async (req: Request, res: Response) => {
    const body = req.body
    console.log(req.body)
    
    const newDeck = new Deck({
      title: body.title
    })
    
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
  }
)

decksRouter.post('/:deckId/cards', async (req: Request, res: Response) => {
    const deckId = req.params.deckId;
    try{
        const deck = await Deck.findById(deckId)
        const {text} = req.body
        if(!deck) return res.status(404).json({"error": "deck do not exists"})
        deck.cards.push(text);
        await deck.save();
        res.json(deck);
    }catch{
        res.status(400).json({"error": "invalid id"})
    }
    
    
    }
)

decksRouter.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    const deck = await Deck.findByIdAndDelete(id)
    res.json(deck)
  }
)

export default decksRouter;
