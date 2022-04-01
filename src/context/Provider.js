import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { fetchResults } from '../services/FetchMealOrDrink';

const Provider = ({ children }) => {
  const [mealsRetrieved, setMealsRetrieved] = useState([]);
  const [drinksRetrieved, setDrinksRetrieved] = useState([]);

  const mealByIngredient = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinksByIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const data = (async () => {
      let { meals } = await fetchResults(mealByIngredient);
      const max = 12;
      meals = meals.filter((_meal, index) => index < max);
      setMealsRetrieved(meals);
    });
    data();
  }, []);

  useEffect(() => {
    const data = (async () => {
      let { drinks } = await fetchResults(drinksByIngredient);
      const max = 12;
      drinks = drinks.filter((_drink, index) => index < max);
      setDrinksRetrieved(drinks);
    });
    data();
  }, []);

  const [state, setState] = useState({
    filters: {
      searchInput: '',
    },
  });

  const [mealsVisible, setMealsVisible] = useState(false);
  const [drinksVisible, setDrinksVisible] = useState(false);

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
