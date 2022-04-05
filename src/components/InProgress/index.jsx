import React, { useState, useEffect, useContext } from 'react';
import { fetchResults } from '../../services/FetchMealOrDrink';
import Context from '../../context/Context';

function InProgress() {
  const {
    mealsVisible,
    drinksVisible,
    setMealsRetrieved,
    setDrinksRetrieved,
    landingMeals,
    landingDrinks,
  } = useContext(Context);
  const [mealsIngredients, setMealsIngredients] = useState([]);
  const [drinksIngredients, setDrinksIngredients] = useState([]);
  const [catClicked, setCatClicked] = useState('');

  const foodsIngr = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const drinksIngr = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

  const fetchMealsCategories = (async () => {
    let { meals } = await fetchResults(foodsIngr);
    const max = 20;
    meals = meals.filter((_mealIngredient, index) => index < max);
    setMealsIngredients(meals);
  });

  useEffect(() => {
    fetchMealsCategories();
  }, []);

  const fetchDrinksCategories = (async () => {
    let { drinks } = await fetchResults(drinksIngr);
    const max = 15;
    drinks = drinks.filter((_drinkIngredient, index) => index < max);
    setDrinksIngredients(drinks);
  });

  useEffect(() => {
    fetchDrinksCategories();
  }, []);

  const mealCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const drinkCategory = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  const handleClick = async ({ target: { value } }) => {
    setCatClicked(value);
    if (value === catClicked) {
      landingMeals();
      landingDrinks();
    }
    if (mealsVisible && !catClicked) {
      const { meals } = await fetchResults(`${mealCategory}${value}`);
      const max = 12;
      setMealsRetrieved(meals.filter((_meal, index) => index < max));
      setCatClicked(!catClicked);
    }
    if (mealsVisible && catClicked) {
      landingMeals();
      setCatClicked(!catClicked);
    }
    if (drinksVisible && !catClicked) {
      const results = await fetch(`${drinkCategory}${value}`);
      const data = await results.json();
      const { drinks } = data;
      const max = 12;
      setDrinksRetrieved(drinks.filter((_drink, index) => index < max));
      setCatClicked(!catClicked);
    }
    if (drinksVisible && catClicked) {
      landingDrinks();
      setCatClicked(!catClicked);
    }
  };

  return (
    <div>
      {mealsVisible && mealsIngredients && mealsIngredients.map(({ strIngredient }) => (
        <button
          type="button"
          key={ strIngredient }
          name={ strIngredient }
          value={ strIngredient }
          data-testid={ `${strIngredient}-category-filter` }
          onClick={ handleClick }
        >
          {strIngredient}
        </button>
      ))}
      {mealsVisible && mealsIngredients
        && (
          <button
            type="button"
            name="All"
            data-testid="All-category-filter"
            onClick={ landingMeals }
          >
            All
          </button>
        )}
      {drinksVisible
        && drinksIngredients
        && drinksIngredients.map(({ strIngredient }) => (
          <button
            type="button"
            key={ strIngredient }
            name={ strIngredient }
            value={ strIngredient }
            data-testid={ `${strIngredient}-category-filter` }
            onClick={ handleClick }
          >
            {strIngredient}
          </button>

        ))}
      {drinksVisible && drinksIngredients
        && (
          <button
            type="button"
            name="All"
            data-testid="All-category-filter"
            onClick={ landingDrinks }
          >
            All
          </button>
        )}
    </div>
  );
}

export default InProgress;
