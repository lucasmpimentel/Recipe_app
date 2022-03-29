import React, { useState } from 'react';
// import React, { useContext, useEffect, useState } from 'react';
// import MealsContext from '../context/MealsContext';
import useFetch from '../../hooks/useFetch';

export default function HeaderSearch() {
// ? confirmar como esse input vem do Req 12
//   const [searchInput] = useContext(MealsContext);
  const [meals, setMeals] = useState('');
  const searchInput = 'orange';

  const urlBase = 'https://www.themealdb.com/api/json/v1/1/';

  const urlSearchIngredient = `${urlBase}filter.php?i=${searchInput}`;
  // Esse traz um objeto com array de objetos que tem o id, e a consulta com o id traz o objeto igual no por nome e primeira letra.
  // https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
  // "meals": [
  // {
  // "strMeal": "Chick-Fil-A Sandwich",
  // "strMealThumb": "https://www.themealdb.com/images/media/meals/sbx7n71587673021.jpg",
  // "idMeal": "53016"
  // },

  const urlSearchName = `${urlBase}search.php?s=${searchInput}`;
  const urlFirstLetter = `${urlBase}search.php?f=${searchInput.charAt(0)}`;

  const [url, setUrl] = useState(`${urlSearchIngredient}`);

  const handleChange = ({ target: { name, value } }) => {
    console.log(name, value);
    switch (value) {
    case 'ingredient-search':
      setUrl(urlSearchIngredient);
      break;
    case 'name-search':
      setUrl(urlSearchName);
      break;
    case 'first-letter-search':
      setUrl(urlFirstLetter);
      break;
    default:
      throw new Error('invalid state');
    }
  };

  // const { data, isLoading, errorMessage } = useFetch(url);
  const { data, isLoading } = useFetch(url);
  if (data) console.log(data);

  const HandleBtn = (event) => {
    event.preventDefault();
    setMeals(data.meals);
  };
  console.log(meals);

  // const mealIngredients = () => {
  //   meals.forEach((meal) => idMeal.map((id)=>useFetch)
  // }

  if (isLoading) return <p>Loading...</p>;

  return (
    <form>
      <label htmlFor="search-recipe">
        <input
          type="radio"
          id="ingredient-search"
          name="search-recipe"
          value="ingredient-search"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
          defaultChecked
        />
        Ingredient
      </label>

      <label htmlFor="search-recipe">
        <input
          type="radio"
          name="search-recipe"
          id="name-search"
          value="name-search"
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
        Name
      </label>

      <label htmlFor="search-recipe">
        <input
          type="radio"
          name="search-recipe"
          id="first-letter-search"
          value="first-letter-search"
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
        First Letter
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ HandleBtn }
        className="btn-ordenar"
      >
        Ordenar
      </button>
    </form>
  );
}
