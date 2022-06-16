import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.css';
import { Link, useLocation } from "react-router-dom";
import tileset from '../../tileset.json'

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

const Home = () => {
  const location = useLocation();

  return (
    <div id="cards">
        {Object.keys(tileset).map(category => 
          <Link to="/game" state={{category: category}} className="category-card" key={category}>
              <img src={process.env.PUBLIC_URL + tileset[category][0]} alt={category} />
              <h5>{category}</h5>
          </Link>
        )}
    </div>
  )
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
