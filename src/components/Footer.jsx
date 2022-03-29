import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link
        to="/drinks"
        data-testid="drinks-bottom-btn"
      >
        <img src={ drinkIcon } alt="Ícone de drinks" />
      </Link>
      <Link to="/explore" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="Ícone de explorar" />
      </Link>
      <Link to="/foods" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="Ícone de comida" />
      </Link>
    </footer>
  );
}
