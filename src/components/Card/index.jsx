import React, { useContext } from 'react';
import Context from '../../context/Context';

function Card() {
  const { drinksRetrieved,
    mealsRetrieved,
    mealsVisible,
    drinksVisible,
  } = useContext(Context);
  return (
    <div>
      {mealsRetrieved
        && mealsVisible
        && mealsRetrieved.map(({ strMeal, strMealThumb, idMeal }, index) => (
          <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
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
            key={ idDrink }
            data-testid={ `${index}-recipe-card` }
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
