import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';

const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState({
    mealsRetrieved: [],
  });

  const [state, setState] = useState({
    filters: {
      searchInput: '',
    },
  });

  const [mealsVisible, setMealsVisible] = useState(false);

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
  };

  return (
    <MealsContext.Provider value={ context }>
      { children }
    </MealsContext.Provider>
  );
};

MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MealsProvider;
