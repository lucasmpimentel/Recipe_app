import React, { useContext } from 'react';
import Context from '../../context/Context';

function Card() {
  const { drinks, meals, mealsVisible, drinksVisible } = useContext(Context);
  console.log(drinks);
  // esvaziar o meals ou drinks no componentwillunmount ou tratar de outra forma aqui?
  // pode causar a renderização de bebidas e comidas se deixar dessa forma.
  return (
    <div>
      {meals && mealsVisible && meals.map(({ strMeal, strMealThumb, idMeal }) => (
        <div key={ idMeal }>
          <img src={ strMealThumb } width="150px" alt={ strMeal } />
          <p>{strMeal}</p>
        </div>
      ))}
      {drinks && drinksVisible && drinks.map(({ strDrink, strDrinkThumb, idDrink }) => (
        <div key={ idDrink }>
          <img src={ strDrinkThumb } width="150px" alt={ strDrink } />
          <p>{strDrink}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;
// strMeal - titulo
// strMealThumb - foto
// idMeal
