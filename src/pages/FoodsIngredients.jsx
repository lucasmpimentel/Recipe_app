import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function FoodsIngredients() {
  const [allIngredients, setAllIngredients] = useState([]);
  const fetchIngredients = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const results = await response.json();
    const ingredients = results.meals;
    const MAX = 12;
    const getIngredients = ingredients.filter((_ingredients, index) => index < MAX);
    setAllIngredients(getIngredients);
    return response.ok ? Promise.resolve(results) : Promise.reject(results);
  };
  useEffect(() => {
    fetchIngredients();
  }, []);
  return (
    <>
      <Header />
      <p data-testid="page-title">Explore Ingredients</p>
      {allIngredients.map(({ idIngredient, strIngredient }, index) => (
        <div
          key={ idIngredient }
          data-testid={ `${index}-ingredient-card` }
          role="button"
          tabIndex={ index }
          onClick={ handleClick }
          onKeyPress={ (e) => e.key === 'Enter' && toDrinkDetail(idDrink) }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt="Imagem do ingrediente"
            width="100px"
            data-testid={ `${index}-card-img` }

          />
          <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
        </div>
      ))}
      <Footer />
    </>
  );
}
