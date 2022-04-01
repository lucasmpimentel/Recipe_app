import React, { useState, useEffect, useContext } from 'react';
import { fetchResults } from '../../services/FetchMealOrDrink';
import Context from '../../context/Context';

function Categories() {
  const {
    mealsVisible,
    drinksVisible,
    setMealsRetrieved,
    setDrinksRetrieved,
  } = useContext(Context);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  const foodsCat = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinksCat = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    const data = (async () => {
      let { meals } = await fetchResults(foodsCat);
      const max = 5;
      meals = meals.filter((_meal, index) => index < max);
      setMealsCategories(meals);
    });
    data();
  }, []);

  useEffect(() => {
    const data = (async () => {
      let { drinks } = await fetchResults(drinksCat);
      const max = 5;
      drinks = drinks.filter((_drink, index) => index < max);
      setDrinksCategories(drinks);
    });
    data();
  }, []);

  const mealCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const drinkCategory = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  const handleClick = async ({ target: { value } }) => {
    if (mealsVisible) {
      let { meals } = await fetchResults(`${mealCategory}${value}`);
      const max = 12;
      meals = meals.filter((_meal, index) => index < max);
      setMealsRetrieved(meals);
    }
    if (drinksVisible) {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`);
      const data = await results.json();
      const { drinks } = data;
      console.log(`${drinkCategory}${value}`);
      const max = 12;
      setDrinksRetrieved(drinks.filter((_drink, index) => index < max));
    }
  };

  return (
    <div>
      {mealsVisible && mealsCategories && mealsCategories.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          value={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ handleClick }
        >
          {strCategory}
        </button>
      ))}
      {drinksVisible
        && drinksCategories
        && drinksCategories.map(({ strCategory }) => (
          <button
            type="button"
            key={ strCategory }
            value={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ handleClick }
          >
            {strCategory}
          </button>
        ))}
    </div>
  );
}

export default Categories;
