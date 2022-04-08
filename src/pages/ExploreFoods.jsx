import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreFoods() {
  const history = useHistory();
  async function handleClick() {
    try {
      const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const response = await fetch(url);
      const randomFood = await response.json();
      const { idMeal } = randomFood.meals[0];
      history.push(`/foods/${idMeal}`);
    } catch (error) {
      return error;
    }
  }

  return (
    <>
      <Header />
      <p data-testid="page-title">Explore Foods</p>

      <Link to="/explore/foods/ingredients">
        <Button type="button" data-testid="explore-by-ingredient">By Ingredient</Button>
      </Link>

      <Link to="/explore/foods/nationalities">
        <Button type="button" data-testid="explore-by-nationality">By Nationality</Button>
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
