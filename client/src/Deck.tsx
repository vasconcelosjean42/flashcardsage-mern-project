import { Key, useEffect, useState } from 'react'
import './App.css'
import { Link, useParams } from 'react-router-dom'
import { createDeck, deckType, deleteDeck, getDecks } from './api/decks'
import { cardType, getCards, createCard } from './api/cards'


export default function Deck(){
    const [text, setText] = useState('')
    const { deckId } = useParams()
    const [card, setCard] = useState<String[]>([])
  
    async function fetchData() {
      const data = await getCards(deckId!)
      setCard(data)
    }
  
    useEffect(() => {
      console.log('useEffect')
      fetchData()
    }, [])
  
    async function handleCreateDeck(e: React.FormEvent) {
      e.preventDefault()
      //(star) we need of card id which we don't know
      //we need to use useParams
      const data = await createCard(deckId!, text)
      console.log(data)
      setText("")
      setCard(data.cards)
    }
  
    // async function handleDeleteDeck(d:deckType){
    //   await deleteDeck(d.id)
    //   //important step(star): delete one item
    //   setCard(card.filter(dc => dc.id !== d.id))
    // }
  
    return (
      <div>
        <form onSubmit={handleCreateDeck}>
          <label htmlFor='card-text'>
            Card Text
          </label>
          <input
            id='card-text' 
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value)
            }}
          />
          <button>Add Text</button>
        </form>
        <ul>
            {card.map((c, i) => {
              return(
                <li style ={{listStyleType:'none' }} key={i}>
                    <p>{c}</p>
                  {/* <button onClick={() => handleDeleteDeck(d)}>
                      <i className="uil uil-trash-alt"></i>
                  </button> */}
                </li>
              )
            })}
        </ul>
      </div>
    )
}