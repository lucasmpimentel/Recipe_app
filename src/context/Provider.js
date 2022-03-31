import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const Provider = ({ children }) => {
  const [meals, setMeals] = useState({
    mealsRetrieved: [],
  });

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
    meals,
    setMeals,
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
