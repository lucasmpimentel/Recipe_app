import React, { useState, useEffect, useContext } from 'react';
import { fetchResults } from '../../services/FetchMealOrDrink';
import Context from '../../context/Context';

function Categories() {
  const {
    mealsVisible,
    drinksVisible,
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

  return (
    <div>
      {mealsVisible && mealsCategories && mealsCategories.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
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
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        ))}
    </div>
  );
}

export default Categories;
