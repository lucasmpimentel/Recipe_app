import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { fetchResults } from '../services/FetchMealOrDrink';

const Provider = ({ children }) => {
  const [mealsRetrieved, setMealsRetrieved] = useState([]);
  const [drinksRetrieved, setDrinksRetrieved] = useState([]);
  const [mealsVisible, setMealsVisible] = useState(false);
  const [drinksVisible, setDrinksVisible] = useState(false);
  const [mealsInProgress, setMealsInProgress] = useState(false);
  const [drinksInProgress, setDrinksInProgress] = useState(false);
  const [state, setState] = useState({
    filters: {
      searchInput: '',
    },
  });
  const [recipeDetails, setRecipeDetails] = useState({
    ingredients: [],
    measures: [],
    instructions: '',
  });

  const mealByIngredient = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinksByIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const landingMeals = (async () => {
    let { meals } = await fetchResults(mealByIngredient);
    const max = 12;
    meals = meals.filter((_meal, index) => index < max);
    setMealsRetrieved(meals);
  });

  useEffect(() => {
    landingMeals();
  }, []);

  const landingDrinks = (async () => {
    let { drinks } = await fetchResults(drinksByIngredient);
    const max = 12;
    drinks = drinks.filter((_drink, index) => index < max);
    setDrinksRetrieved(drinks);
  });

  useEffect(() => {
    landingDrinks();
  }, []);

  const setFilter = (filter, value) => {
    setState((prevState) => ({
      ...prevState,
      filters: { ...prevState.filters, [filter]: value } }
    ));
  };

  const context = {
    ...state,
    setState,
    mealsRetrieved,
    setMealsRetrieved,
    setDrinksRetrieved,
    drinksRetrieved,
    setFilter,
    mealsVisible,
    setMealsVisible,
    drinksVisible,
    setDrinksVisible,
    landingMeals,
    landingDrinks,
    recipeDetails,
    setRecipeDetails,
    mealsInProgress,
    setMealsInProgress,
    drinksInProgress,
    setDrinksInProgress,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
