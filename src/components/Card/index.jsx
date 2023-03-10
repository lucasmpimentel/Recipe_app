import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import './card.css';

function Card() {
  const {
    drinksRetrieved,
    mealsRetrieved,
    mealsVisible,
    drinksVisible,
  } = useContext(Context);
  const history = useHistory();

  const toMealDetail = (idMeal) => history.push(`/foods/${idMeal}`);

  const toDrinkDetail = (idDrink) => history.push(`/drinks/${idDrink}`);

  return (
    <div className="meals-drinks-images">
      {mealsRetrieved
        && mealsVisible
        && mealsRetrieved.map(({ strMeal, strMealThumb, idMeal }, index) => (
          <div
            role="button"
            tabIndex="0"
            key={ idMeal }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => (toMealDetail(idMeal)) }
            onKeyPress={ (e) => e.key === 'Enter' && toMealDetail(idMeal) }
            className="card-item"
          >
            <img
              src={ strMealThumb }
              width="100px"
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
              className="card-img"
            />
            <p data-testid={ `${index}-card-name` } className="card-name">{strMeal}</p>
          </div>
        ))}
      {drinksRetrieved && drinksVisible
        && drinksRetrieved.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
          <div
            role="button"
            tabIndex={ index }
            key={ idDrink }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => (toDrinkDetail(idDrink)) }
            onKeyPress={ (e) => e.key === 'Enter' && toDrinkDetail(idDrink) }
            className="card-item"
          >
            <img
              src={ strDrinkThumb }
              width="100px"
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
              className="card-img"
            />
            <p data-testid={ `${index}-card-name` } className="card-name">{strDrink}</p>
          </div>
        ))}
    </div>
  );
}

export default Card;
