import axios from 'axios'

export interface deckType {
    title: string
    cards: string[]
    id: string
}

const baseUrl = 'http://localhost:5001/decks'

const getDecks = async (): Promise<deckType[]> => {
    const {data} = await axios.get(baseUrl)
    return data
}

const createDeck = async (title: string) => {
    const newDeck = {
        title: title
      }
    const deckUpdated = await axios.post(baseUrl,newDeck)
    return deckUpdated
}

const deleteDeck = async (id: string) => {
    await axios.delete(`${baseUrl}/${id}`)
}

export {
    getDecks, createDeck, deleteDeck
}