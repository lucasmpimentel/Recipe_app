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
      >
        <button type="button" data-testid="drinks-bottom-btn" src={ drinkIcon }>
          <img name="drink" src={ drinkIcon } alt="Ícone de drinks" />
        </button>
      </Link>

      <Link to="/explore">
        <button type="button" data-testid="explore-bottom-btn" src={ exploreIcon }>
          <img name="explore" src={ exploreIcon } alt="Ícone de explorar" />
        </button>
      </Link>

      <Link to="/foods">
        <button type="button" data-testid="food-bottom-btn" src={ mealIcon }>
          <img name="food" src={ mealIcon } alt="Ícone de comida" />
        </button>
      </Link>
    </footer>
  );
}
