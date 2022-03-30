import React from 'react';
import Header from '../components/Header';

export default function Explore() {
  return (
    <>
      <Header />
      <p data-testid="page-title" searchTopBtn>Explore</p>
      <button
        data-testid="explore-foods"
        type="button"
      >
        {' '}
        Explore Foods
      </button>
      <button
        data-testid="explore-drinks"
        type="button"
      >
        {' '}
        Explore Drinks
      </button>
    </>
  );
}
