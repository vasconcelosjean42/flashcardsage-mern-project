import { Key, useEffect, useState } from "react";
import "./App.css";
import { Link, useParams } from "react-router-dom";
import { createDeck, deckType, deleteDeck, getDecks } from "./api/decks";
import { cardType, getCards, createCard, deleteCard } from "./api/cards";

export default function Deck() {
  const [deck, setDeck] = useState<deckType | undefined>();
  const [text, setText] = useState("");
  const { deckId } = useParams();
  const [card, setCard] = useState<string[]>([]);

  async function fetchData() {
    const newDeck = await getCards(deckId!);
    setDeck(newDeck);
    setCard(newDeck.cards);
  }

  useEffect(() => {
    console.log("useEffect");
    fetchData();
  }, []);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    //(star) we need of card id which we don't know
    //we need to use useParams
    const { cards: serverCards } = await createCard(deckId!, text);
    console.log(serverCards);
    setText("");
    setCard(serverCards);
  }

  async function handleDeleteCard(index: string) {
    await deleteCard(deckId!, index);
    //important step(star): delete one item
    setCard(card.filter((dc, i) => i !== index));
  }

  return (
    <div className="App">
      <h1>{deck?.title}</h1>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="card-text">Card Text</label>
        <input
          id="card-text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button>Add Text</button>
      </form>
      <ul>
        {card.map((c, i) => {
          return (
            <li style={{ listStyleType: "none" }} key={i}>
              <p>{c}</p>
              <button onClick={() => handleDeleteCard(i)}>
                <i className="uil uil-trash-alt"></i>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
