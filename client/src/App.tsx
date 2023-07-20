import { Key, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

export interface deckType {
  title: String
  id: String
}

function App() {
  const [title, setTitle] = useState('')
  const [deck, setDeck] = useState<deckType[]>([])

  function fetchData() {
    axios.get('http://localhost:5001/decks')
    .then(({data}) => {
      setDeck(data)
    }).catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    console.log('useEffect')
    fetchData()
  }, [])

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault()
    await axios.post('http://localhost:5001/decks',{
      title: title
    })
    setTitle("")
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
                {d.title}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default App
