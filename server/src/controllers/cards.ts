import {Request, Response, Router} from 'express'
import Deck from '../models/Deck';

const cardsRouter = Router()

cardsRouter.get('/:deckId/cards', async (req: Request, res: Response) => {
    const {deckId} = req.params
    const deck = await Deck.findById(deckId)
    if(!deck) return res.status(404).json({"error": "deck do not exists"})
    res.json(deck)
  }
)

cardsRouter.post('/:deckId/cards', async (req: Request, res: Response) => {
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

cardsRouter.delete('/:deckId/cards/:index', async (req: Request, res: Response) => {
    try{
        const {deckId, index} = req.params
        const deck = await Deck.findById(deckId)
        if(!deck) return res.status(404).json({"error": "deck do not exists"})
        deck.cards.splice(Number(index), 1)
        await deck.save()
        res.json(deck)
    }catch{
        res.status(400).json({"error": "invalid id"})
    }
  }
)

export default cardsRouter;
