import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreDrinks() {
  return (
    <>
      <Header />
      <p data-testid="page-title">Explore Drinks</p>
      <Link to="/explore/drinks/ingredients">
        <button type="button" data-testid="explore-by-ingredient">By Ingredient</button>
      </Link>
      <button type="button" data-testid="explore-surprise">Surprise me!</button>
      <Footer />
    </>
  );
}
