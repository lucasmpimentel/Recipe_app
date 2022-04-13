import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
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
        <Button
          className="footer-btn"
          variant="outline-info"
          type="button"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
        >
          <img
            className="footer-icons"
            name="drink"
            src={ drinkIcon }
            alt="Ícone de drinks"
          />
        </Button>
      </Link>

      <Link to="/explore">
        <Button
          className="footer-btn"
          variant="outline-info"
          type="button"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
        >
          <img
            className="footer-icons"
            name="explore"
            src={ exploreIcon }
            alt="Ícone de explorar"
          />
        </Button>
      </Link>

      <Link to="/foods">
        <Button
          className="footer-btn"
          variant="outline-info"
          type="button"
          data-testid="food-bottom-btn"
          src={ mealIcon }
        >
          <img
            className="footer-icons"
            name="food"
            src={ mealIcon }
            alt="Ícone de comida"
          />
        </Button>
      </Link>
    </footer>
  );
}
