import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [title, setTitle] = useState('')
  useEffect(() => {
    console.log("title: " + title)
  })
  
  function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault()
    axios.post('http://localhost:5000/decks',{
      title: title
    }).then(() => {
      console.log('foi')
    }).catch(e => {
      console.log(e)
    })
  }
  
  return (
    <div>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='deck-title'>
          Deck Title
        </label>
        <input id='deck-title' 
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
