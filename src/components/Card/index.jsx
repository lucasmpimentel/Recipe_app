import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';

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

  const checkMeal = (e) => console.log(e.key);

  return (
    <div>
      {mealsRetrieved
        && mealsVisible
        && mealsRetrieved.map(({ strMeal, strMealThumb, idMeal }, index) => (
          <div
            role="button"
            tabIndex={ index }
            key={ idMeal }
            data-testid={ `${index}-recipe-card` }
            // onClick={ (toMealDetail(idMeal)) }
            // onKeyDown={ checkMeal(e) }
          >
            <img
              src={ strMealThumb }
              width="100px"
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{strMeal}</p>
          </div>
        ))}
      {drinksRetrieved && drinksVisible
        && drinksRetrieved.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
          <div
            role="button"
            tabIndex={ index }
            key={ idDrink }
            data-testid={ `${index}-recipe-card` }
            onClick={ toDrinkDetail(idDrink) }
            onKeyDown={ toDrinkDetail(idDrink) }
          >
            <img
              src={ strDrinkThumb }
              width="100px"
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{strDrink}</p>
          </div>
        ))}
    </div>
  );
}

export default Card;
