import React, { useState, useEffect, useContext } from 'react';
import { fetchResults } from '../../services/FetchMealOrDrink';
import Context from '../../context/Context';

function Categories() {
  const {
    mealsVisible,
    drinksVisible,
    setMealsRetrieved,
    setDrinksRetrieved,
    landingMeals,
    landingDrinks,
  } = useContext(Context);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [catClicked, setCatClicked] = useState(false);

  const foodsCat = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinksCat = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const fetchMealsCategories = (async () => {
    let { meals } = await fetchResults(foodsCat);
    const max = 5;
    meals = meals.filter((_mealCategorie, index) => index < max);
    setMealsCategories(meals);
  });

  useEffect(() => {
    fetchMealsCategories();
  }, []);

  const fetchDrinksCategories = (async () => {
    let { drinks } = await fetchResults(drinksCat);
    const max = 5;
    drinks = drinks.filter((_drinkCategorie, index) => index < max);
    setDrinksCategories(drinks);
  });

  useEffect(() => {
    fetchDrinksCategories();
  }, []);

  const mealCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const drinkCategory = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  const handleClick = async ({ target: { value } }) => {
    if (mealsVisible && !catClicked) {
      const { meals } = await fetchResults(`${mealCategory}${value}`);
      const max = 12;
      setMealsRetrieved(meals.filter((_meal, index) => index < max));
      setCatClicked(!catClicked);
    }
    if (mealsVisible && catClicked) {
      console.log('entrei no if do toggle, devo mostar fetchMealsCategories');
      landingMeals();
      setCatClicked(!catClicked);
    }
    if (drinksVisible) {
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
