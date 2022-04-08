import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explore() {
  return (
    <>
      <Header />
      <p data-testid="page-title" searchTopBtn>Explore</p>
      <Link to="/explore/foods">
        <Button
          data-testid="explore-foods"
          type="button"
        >
          {' '}
          Explore Foods
        </Button>
      </Link>
      <Link to="/explore/drinks">
        <Button
          data-testid="explore-drinks"
          type="button"
        >
          {' '}
          Explore Drinks
        </Button>
      </Link>
      <Footer />
    </>
  );
}
