import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreFoods() {
  return (
    <>
      <Header />
      <p data-testid="page-title">Explore Foods</p>
      <Link to="/explore/foods/ingredients">
        <button type="button" data-testid="explore-by-ingredient">By Ingredient</button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <button type="button" data-testid="explore-by-nationality">By Nationality</button>
      </Link>
      <button type="button" data-testid="explore-surprise">Surprise me!</button>
      <Footer />
    </>
  );
}
