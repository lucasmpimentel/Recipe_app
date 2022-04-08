import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import './drinks.css';
import Header from '../components/Header';
import MealsContext from '../context/Context';
import Card from '../components/Card';
import Categories from '../components/Categories';

export default function Drinks() {
  const { setDrinksVisible } = useContext(MealsContext);

  // component did mount
  useEffect(() => {
    setDrinksVisible(true);
  }, [setDrinksVisible]);

  // component will unmount
  useEffect(() => () => {
    setDrinksVisible(false);
  },
  [setDrinksVisible]);

  //   useEffect(() => {
  //   return () => {
  //     setDrinksVisible(false);
  //   };
  // }, [setDrinksVisible]);

  return (
    <main className="drinks">
      <Header searchTopBtn />
      <p className="title" data-testid="page-title">Drinks</p>
      <Categories />
      <Card />
      <Footer />
    </main>
  );
}
