import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './MemoryGame.css'
import Card from '../../components/Card/Card'
import tileset from '../../tileset.json'
import { useNavigate, useLocation } from "react-router-dom";

const difficulties = {
  'Easy': 1500,
  'Medium': 800,
  'Hard': 500
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}


function MemoryGame() {
  const [difficulty, setDifficulty] = useState(difficulties['Medium']);
  const [cards, setCards] = useState([])
  const [disabled, setDisabled] = useState(false);
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [turns, setTurns] = useState(0);
  const [h_size, setH_size] = useState(3);
  const [v_size, setV_size] = useState(4);
  const [gridstyle, setGridStyle] = useState('1fr 1fr 1fr 1fr;')

  const location = useLocation();
  const state = location.state;

  const newGame = () => {
    setCards(generateCards())
    setTurns(0)
  }

  const changeDifficulty = (e) => {
    if (typeof e.target.value == 'string' && difficulty != difficulties[e.target.value]) {
      setDifficulty(difficulties[e.target.value])
      newGame();
    }
  }
  const changeSize = (e) => {
    if (e.target.id == 'horizontal') {
      console.log(e.target.value)
      setH_size(e.target.value)
    } else if (e.target.id == 'vertical') {
      console.log(e.target.value)
      setV_size(e.target.value)
    }
  }
  const checkWin = () => {
    if (cards.length > 0 && cards.every(card => card.matched === true)) {
      alert(`won at ${getKeyByValue(difficulties, difficulty)} difficulty for ${turns} turns`.toLowerCase())
    }
  }

  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setDisabled(false)
  }

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }

  const generateCards = () => {
    let cards_set = []
    for (let i = 0; i < (h_size * v_size) / 2; i++) {
      let card = { img: tileset[state.category][Math.round(Math.random() * 11)] }
      if (!cards_set.some((c) => c.img === card.img)) {
        cards_set.push(card)
      } else i--
    }
    let cards = [...cards_set, ...cards_set]
    return cards.sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }))
  }

  useEffect(() => {
    setTimeout(() => checkWin(), 500)
  }, [cards])

  useEffect(() => {
    newGame()
    let style = ""
    for (let i = 0; i < v_size; i++) {
      style += '1fr '
    }
    setGridStyle(style)
  }, [state, h_size, v_size])

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true)
      setTurns(turns => turns + 1)
      if (firstChoice.img === secondChoice.img) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.img === firstChoice.img) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn();
      }
      else {
        setTimeout(() => resetTurn(), difficulty)
      }
    }
  }, [firstChoice, secondChoice])

  return (
    <div>
      <input type='button' value='New Game' onClick={newGame} />
      <p>Turns: {turns}</p>
      <div className='settings'>
        <div className='difficulty' onClick={changeDifficulty}>
          <label htmlFor="difficulty">Board size:</label>
          <input name="difficulty" className={difficulty === difficulties['Easy'] ? 'active' : ''} type='button' value='Easy' />
          <input name="difficulty" className={difficulty === difficulties['Medium'] ? 'active' : ''} type='button' value='Medium' />
          <input name="difficulty" className={difficulty === difficulties['Hard'] ? 'active' : ''} type='button' value='Hard' />
        </div>
        <div className='size'>
          <label htmlFor="size">Board size:</label>
          <input name='size' id="horizontal" onChange={changeSize} type='number' min="1" max="4" value={h_size} />
          <input name='size' id="vertical" onChange={changeSize} type='number' min="1" max="4" value={v_size} />
        </div>
      </div>
      <div id='cards' style={{ 'grid-template-columns': gridstyle }}>{
        cards.map(card => (
          <Card key={card.id} card={card} handleChoice={handleChoice}
            flipped={card.matched || card === firstChoice || card === secondChoice}
            disabled={disabled} />
        ))}
      </div>
    </div>
  )
}

export default MemoryGame
