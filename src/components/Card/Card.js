import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.css';

export default function Card({card, handleChoice, flipped, disabled}){
  const handleClick = () =>{
    if(!disabled){
      handleChoice(card)
    }
  }
  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img className='front' src={process.env.PUBLIC_URL + card.img}/>
        <img className='back'  src={process.env.PUBLIC_URL + 'images/none.png'} onClick={handleClick}/>
      </div>
    </div>
  )
}
