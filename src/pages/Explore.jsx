import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explore() {
  return (
    <>
      <Header />
      <p data-testid="page-title" searchTopBtn>Explore</p>
      <Footer />
    </>
  );
}
