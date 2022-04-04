import React, { useState } from 'react';
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
    console.log(allDrinks);
    return response.ok ? Promise.resolve(results) : Promise.reject(results);
  };

  return (
    <>
      <Header />
      <p data-testid="page-title">Explore Ingredients</p>
      <Footer />
    </>
  );
}
