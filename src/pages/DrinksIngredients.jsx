import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

export default function DrinksIngredients() {
  const [allDrinks, setAllDrinks] = useState([]);
  const {
    setDrinksRetrieved,
  } = useContext(Context);

  const history = useHistory();

  const fetchDrinksIngredients = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const results = await response.json();
    const drinksIngredients = results.drinks;
    const MAX = 12;
    const getDrinksIngredients = drinksIngredients
      .filter((_allIngredients, index) => index < MAX);
    setAllDrinks(getDrinksIngredients);
    return response.ok ? Promise.resolve(results) : Promise.reject(results);
  };

  const handleClick = (async (strIngredient1) => {
    const response = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${strIngredient1}`);
    const results = await response.json();
    const MAX = 12;
    const drinksIngredients = results.drinks
      .filter((_allIngredients, index) => index < MAX);
    setDrinksRetrieved(drinksIngredients);
    history.push('/drinks');
  });

  useEffect(() => {
    fetchDrinksIngredients();
  }, []);

  return (
    <>
      <Header />
      <p data-testid="page-title">Explore Ingredients</p>
      {allDrinks.map(({ strIngredient1 }, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          role="button"
          tabIndex={ index }
          onClick={ () => handleClick(strIngredient1) }
          onKeyPress={ (e) => e.key === 'Enter' && handleClick(strIngredient1) }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            alt="Imagem do drink"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
        </div>
      ))}
      <Footer />
    </>
  );
}
