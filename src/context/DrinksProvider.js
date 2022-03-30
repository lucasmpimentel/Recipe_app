import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from './DrinksContext';

const DrinksProvider = ({ children }) => {
  const [drinksVisible, setDrinksVisible] = useState(false);

  const drinks = {
    drinksVisible,
    setDrinksVisible,
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
