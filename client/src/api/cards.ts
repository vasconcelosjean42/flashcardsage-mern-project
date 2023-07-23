import axios from 'axios'
import { deckType } from './decks'

const baseUrl = 'http://localhost:5001/decks'

const getCards = async (idDeck: string): Promise<deckType>=> {
  const response = await axios.get(`${baseUrl}/${idDeck}/cards`)
  console.log(response.data)
  return response.data
}

const createCard = async (idDeck: string, text: string): Promise<deckType> => {
  const newCard = {
      text: text
    }
  const deckUpdated = await axios.post(`${baseUrl}/${idDeck}/cards`,newCard)
  return deckUpdated.data
}

const deleteCard = async (id: string, index: string) => {
  await axios.delete(`${baseUrl}/${id}/cards/${index}`)
}

export {getCards, createCard, deleteCard}