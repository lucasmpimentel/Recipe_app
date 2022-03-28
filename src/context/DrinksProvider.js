import React from 'react';
import PropTypes from 'prop-types';
import DrinksContext from './DrinksContext';
import useFetch from '../hooks/useFetch';

// let drinkIngredientName;
// ----------------------------- ENDPOINTS --------------------------------------
const DRINKS_CATEGORIES_ENDPOINT = 'www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
// const DRINKS_GLASSES_ENDPOINT = `www.thecocktaildb.com/api/json/v1/1/list.php?g=list`;
// const DRINKS_INGREDIENTS_ENDPOINT = `www.thecocktaildb.com/api/json/v1/1/list.php?i=list`;
// const DRINKS_ALCOHOLIC_ENDPOINT = `www.thecocktaildb.com/api/json/v1/1/list.php?a=list`;
// const DRINKS_IMAGE_ENDPOINT = `www.thecocktaildb.com/images/ingredients/${drinkIngredientName}-Small.png`;

const DrinksProvider = ({ children }) => {
  const { errorMessage, isLoading, data } = useFetch(DRINKS_CATEGORIES_ENDPOINT);

  const drinks = {
    characters: data ? data.results : [],
    isLoading,
    errorMessage,
  };

  return (
    <DrinksContext.Provider value={ drinks }>
      { children }
    </DrinksContext.Provider>
  );
};

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;
