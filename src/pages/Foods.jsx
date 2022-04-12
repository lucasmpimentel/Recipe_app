import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Categories from '../components/Categories';

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

  return (
    <>
      <Header searchTopBtn />
      <p data-testid="page-title" className="title">Foods</p>
      <Categories />
      <Card />
      <Footer />
    </>
  );
}
