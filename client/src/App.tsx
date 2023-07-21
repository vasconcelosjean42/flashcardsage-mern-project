import { Key, useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { createDeck, deckType, deleteDeck, getDecks } from './api/decks'

function App() {
  const [title, setTitle] = useState('')
  const [deck, setDeck] = useState<deckType[]>([])

  async function fetchData() {
    const data = await getDecks()
    setDeck(data)
  }

  useEffect(() => {
    console.log('useEffect')
    fetchData()
  }, [])

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault()
    const deckUpdated = await createDeck(title)
    setTitle("")
    setDeck(deck.concat(deckUpdated.data))
  }

  async function handleDeleteDeck(d:deckType){
    await deleteDeck(d.id)
    //important step(star): delete one item
    setDeck(deck.filter(dc => dc.id !== d.id))
  }

  return (
    <div>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='deck-title'>
          Deck Title
        </label>
        <input
          id='deck-title' 
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
        <button>Create Deck</button>
      </form>
      <ul>
          {deck.map(d => {
            return(
              <li style ={{listStyleType:'none' }}key={d.id as Key}>
                <Link to={`decks/${d.id}`}>
                  <p>{d.title}</p>
                </Link>
                <button onClick={() => handleDeleteDeck(d)}>
                    <i className="uil uil-trash-alt"></i>
                </button>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default App
