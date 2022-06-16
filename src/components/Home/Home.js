import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.css';
import { Link, useLocation } from "react-router-dom";
import tileset from '../../tileset.json'

const Home = () => {
  const location = useLocation();

  return (
    <>
    <h1>Categories</h1>
    <div id="cards" style={{'grid-template-columns': '1fr 1fr 1fr 1fr'}}>
        {Object.keys(tileset).map(category => 
          <Link to="/game" state={{category: category}} className="category-card" key={category}>
              <img src={process.env.PUBLIC_URL + tileset[category][Math.round(Math.random() * 11)]} alt={category} />
              <h5>{category}</h5>
          </Link>
        )}
    </div>
    </>
  )
};

export default Home;
