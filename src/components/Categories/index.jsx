import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { fetchResults } from '../../services/FetchMealOrDrink';
import Context from '../../context/Context';
import './categories.css';

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
  const [catClicked, setCatClicked] = useState('');
  const [isBtnClicked, setIsBtnClicked] = useState(false);

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
    setCatClicked(value);

    // primeiro clique não tem catClicked nem anyCatClicked
    if (mealsVisible && !catClicked && !isBtnClicked) {
      const { meals } = await fetchResults(`${mealCategory}${value}`);
      const max = 12;
      setMealsRetrieved(meals.filter((_meal, index) => index < max));
    }
    if (drinksVisible && !catClicked && !isBtnClicked) {
      const results = await fetch(`${drinkCategory}${value}`);
      const data = await results.json();
      const { drinks } = data;
      const max = 12;
      setDrinksRetrieved(drinks.filter((_drink, index) => index < max));
    }

    setIsBtnClicked(true);

    if (mealsVisible && value === catClicked) {
      landingMeals();
    }
    if (mealsVisible && value !== catClicked) {
      const { meals } = await fetchResults(`${mealCategory}${value}`);
      const max = 12;
      setMealsRetrieved(meals.filter((_meal, index) => index < max));
    }

    if (drinksVisible && value === catClicked) {
      landingDrinks();
    }
    if (drinksVisible && value !== catClicked) {
      const results = await fetch(`${drinkCategory}${value}`);
      const data = await results.json();
      const { drinks } = data;
      const max = 12;
      setDrinksRetrieved(drinks.filter((_drink, index) => index < max));
    }
  };

  return (
    <div>
      {mealsVisible && mealsCategories && mealsCategories.map(({ strCategory }) => (
        <Button
          size="sm"
          className="button"
          variant="outline-dark"
          type="button"
          key={ strCategory }
          name={ strCategory }
          value={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ handleClick }
        >
          {strCategory}
        </Button>
      ))}
      {mealsVisible && mealsCategories
        && (
          <Button
            size="sm"
            variant="outline-dark"
            type="button"
            name="All"
            data-testid="All-category-filter"
            onClick={ landingMeals }
          >
            All
          </Button>
        )}
      {drinksVisible
        && drinksCategories
        && drinksCategories.map(({ strCategory }) => (
          <Button
            size="sm"
            variant="outline-dark"
            type="button"
            key={ strCategory }
            name={ strCategory }
            value={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ handleClick }
          >
            {strCategory}
          </Button>

        ))}
      {drinksVisible && drinksCategories
        && (
          <Button
            size="sm"
            variant="outline-dark"
            type="button"
            name="All"
            data-testid="All-category-filter"
            onClick={ landingDrinks }
          >
            All
          </Button>
        )}
    </div>
  );
}

export default Categories;
