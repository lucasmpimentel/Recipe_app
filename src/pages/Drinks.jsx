import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Drinks() {
  return (
    <>
      <Header searchTopBtn />
      <p data-testid="page-title">Drinks</p>
      <Footer />
    </>
  );
}
