import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import MealsContext from '../context/Context';

export default function Drinks() {
  const { setDrinksVisible } = useContext(MealsContext);

  // component did mount
  useEffect(() => {
    setDrinksVisible(true);
  }, [setDrinksVisible]);

  // component will unmount
  useEffect(() => {
    console.log('Hello World');
    return () => {
      console.log('Do some cleanup');
      setDrinksVisible(false);
    };
  }, [setDrinksVisible]);

  return (
    <>
      <Header searchTopBtn />
      <p data-testid="page-title">Drinks</p>
    </>
  );
}
