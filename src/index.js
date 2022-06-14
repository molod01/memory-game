import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MemoryGame from './components/MemoryGame/MemoryGame';
import Card from './components/Card/Card';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/game" element={MemoryGame}/>
    </Routes>
    <App />
  </BrowserRouter>
);


reportWebVitals();
