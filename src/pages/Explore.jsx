import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './explore.css';

export default function Explore() {
  return (
    <main className="main-explore">
      <div className="main-opacity">
        <Header />
        <p className="title" data-testid="page-title" searchTopBtn>Explore</p>
        <Link to="/explore/foods">
          <Button
            variant="danger"
            data-testid="explore-foods"
            type="button"
            className="explore-foods"
          >
            {' '}
            Explore Foods
          </Button>
        </Link>
        <Link to="/explore/drinks">
          <Button
            variant="danger"
            data-testid="explore-drinks"
            type="button"
            className="explore-drinks"
          >
            {' '}
            Explore Drinks
          </Button>
        </Link>
        <Footer />
      </div>
    </main>
  );
}
