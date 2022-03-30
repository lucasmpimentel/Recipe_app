import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Foods() {
  return (
    <>
      <Header searchTopBtn />
      <p data-testid="page-title">Foods</p>
      <Footer />
    </>
  );
}
