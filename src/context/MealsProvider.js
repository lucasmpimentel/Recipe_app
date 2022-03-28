import React from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';
import useFetch from '../hooks/useFetch';

// let ingredientName; // para image_endpoint
// ----------------------------- ENDPOINTS --------------------------------------
const CATEGORIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
// const NATIONALITIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
// const INGREDIENTS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
// const IMAGE_ENDPOINT = `https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png`;

const MealsProvider = ({ children }) => {
  const { error, isLoading, data } = useFetch(CATEGORIES_ENDPOINT);

  const context = {
    characters: data ? data.results : [],
    isLoading,
    error,
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
