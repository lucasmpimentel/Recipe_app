import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreDrinks() {
  const history = useHistory();
  async function handleClick() {
    try {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const response = await fetch(url);
      const randomDrinks = await response.json();
      const { idDrink } = randomDrinks.drinks[0];
      history.push(`/drinks/${idDrink}`);
    } catch (error) {
      return error;
    }
  }
  return (
    <>
      <Header />
      <p data-testid="page-title">Explore Drinks</p>

      <Link to="/explore/drinks/ingredients">
        <button type="button" data-testid="explore-by-ingredient">By Ingredient</button>
      </Link>

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleClick }
      >
        Surprise me!
      </button>

      <Footer />
    </>
  );
}
