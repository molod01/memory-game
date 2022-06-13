import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './MemoryGame.css';
import Card from '../../components/Card/Card'

const tiles = [
  'images/animal_0.png',
  'images/animal_1.png',
  'images/animal_2.png',
  'images/animal_3.png',
  'images/animal_4.png',
  'images/animal_5.png',
  'images/animal_6.png',
  'images/animal_7.png',
  'images/animal_8.png',
  'images/animal_9.png',
  'images/animal_10.png',
  'images/animal_11.png',
  'images/animal_12.png'
]
const difficulties = {
  'Easy' : 1500,
  'Medium' : 800,
  'Hard' : 500
}

function MemoryGame() {
  const [difficulty, setDifficulty] = useState(difficulties['Easy']);
  const [cards, setCards] = useState([])
  const [disabled, setDisabled] = useState(false);
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [turns, setTurns] = useState(0);

  const newGame = () => {
    setCards(generateCards(3, 4))
    setTurns(0)
  }

  useEffect(()=>{
    setTimeout(() => checkWin(), 500);
  }, [cards])
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true)
      setTurns(turns => turns+1)
      if (firstChoice.img === secondChoice.img) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.img === firstChoice.img) {
              return { ...card, matched: true }
            } else {
              return card;
            }
          })
        })
        resetTurn();
      }
      else {
        setTimeout(() => resetTurn(), difficulty);
      }
    }
  }, [firstChoice, secondChoice]);

  const changeDifficult = (e) =>{
    if(typeof e.target.value == 'string' && difficulty!= difficulties[e.target.value]){
      setDifficulty(difficulties[e.target.value])
      newGame();
    }
  }
  const checkWin = () =>{
    if(cards.length > 0 && cards.every(card => card.matched === true)){
      alert(`won at ${difficulties[difficulty]} difficulty for ${turns} turns`)
    }
  }
  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setDisabled(false)
  }
  const generateCards = (boardSizeX, boardSizeY) => {
    let cards_set = []
    for (let i = 0; i < (boardSizeX * boardSizeY) / 2; i++) {
      let card = { img: tiles[Math.round(Math.random() * 11)] }
      if (!cards_set.some((c) => c.img === card.img)) {
        cards_set.push(card)
      } else i--;
    }
    let cards = [...cards_set, ...cards_set]
    return cards.sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));
  }

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }
  return (
    <div className='game'>
      <input type='button' value='New Game' onClick={newGame} />
      <p>Turns: {turns}</p>
      <div className='difficult' onClick={changeDifficult}>
        <input className={difficulty === difficulties['Easy'] ? 'active' : ''} type='button' value='Easy'/>
        <input className={difficulty === difficulties['Medium'] ? 'active' : ''} type='button' value='Medium'/>
        <input className={difficulty === difficulties['Hard'] ? 'active' : ''} type='button' value='Hard'/>
      </div>
      <div id='cards'>{
        cards.map((card) => (
          <Card key={card.id} card={card}
            handleChoice={handleChoice}
            flipped={card.matched ||
              card === firstChoice ||
              card === secondChoice} 
              disabled={disabled}/>
        ))}
      </div>
    </div>
  )

}


export default MemoryGame;
