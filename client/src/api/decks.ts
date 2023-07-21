import axios from 'axios'

export interface deckType {
    title: String
    id: String
}

const baseUrl = 'http://localhost:5001/decks'

const getDecks = async (): Promise<deckType[]> => {
    const {data} = await axios.get(baseUrl)
    return data
}

const createDeck = async (title: String) => {
    const newDeck = {
        title: title
      }
    const deckUpdated = await axios.post('http://localhost:5001/decks',newDeck)
    return deckUpdated
}

const deleteDeck = async (id: String) => {
    await axios.delete(`http://localhost:5001/decks/${id}`)
}

export {
    getDecks, createDeck, deleteDeck
}