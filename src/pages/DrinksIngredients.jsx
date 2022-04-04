import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DrinksIngredients() {
  const [allDrinks, setAllDrinks] = useState([]);

  const fetchDrinksIngredients = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const results = await response.json();
    const drinksIngredients = results.drinks;
    console.log(drinksIngredients);
    const MAX = 12;
    const getDrinksIngredients = drinksIngredients
      .filter((_allIngredients, index) => index < MAX);
    setAllDrinks(getDrinksIngredients);
    return response.ok ? Promise.resolve(results) : Promise.reject(results);
  };
  useEffect(() => {
    fetchDrinksIngredients();
  });
  return (
    <>
      <Header />
      <p data-testid="page-title">Explore Ingredients</p>
      {allDrinks.map(({ strIngredient1 }, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
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
