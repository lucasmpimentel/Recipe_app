import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

export default function FoodsIngredients() {
  const [allIngredients, setAllIngredients] = useState([]);
  const { setMealsRetrieved } = useContext(Context);

  const history = useHistory();

  const fetchIngredients = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const results = await response.json();
    const ingredients = results.meals;
    const MAX = 12;
    const getIngredients = ingredients.filter((_ingredients, index) => index < MAX);
    setAllIngredients(getIngredients);
    return response.ok ? Promise.resolve(results) : Promise.reject(results);
  };

  const handleClick = (async (strIngredient) => {
    const response = await
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`);
    const results = await response.json();
    const foodsIngredients = results.meals;
    setMealsRetrieved(foodsIngredients);
    history.push('/foods');
  });

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
          onClick={ () => handleClick(strIngredient) }
          onKeyPress={ (e) => e.key === 'Enter' && handleClick(strIngredient) }
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
