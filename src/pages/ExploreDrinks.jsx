import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreDrinks() {
  return (
    <>
      <Header />
      <p data-testid="page-title">Explore Drinks</p>
      <button type="button" data-testid="explore-by-ingredient">By Ingredient</button>
      <button type="button" data-testid="explore-surprise">Surprise me!</button>
      <Footer />
    </>
  );
}
