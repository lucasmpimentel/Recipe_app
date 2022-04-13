import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Categories from '../components/Categories';
import './FoodsAndDrinks.css';

export default function Foods() {
  const { setMealsVisible } = useContext(Context);

  // component did mount
  useEffect(() => {
    setMealsVisible(true);
  }, [setMealsVisible]);

  // component will unmount
  useEffect(() => () => {
    setMealsVisible(false);
  },
  [setMealsVisible]);

  // mesma acima com consoles.log
  // useEffect(() => {
  //   console.log('Hello World');
  //   return () => {
  //     console.log('Do some cleanup');
  //     setMealsVisible(false);
  //   };
  // }, [setMealsVisible]);

  return (
    <main className="foods-drinks-main">
      <Header searchTopBtn />
      <p data-testid="page-title" className="foods-drinks-title">Foods</p>
      <Categories />
      <Card />
      <Footer />
    </main>
  );
}
