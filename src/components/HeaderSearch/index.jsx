import React, { useState, useContext } from 'react';
// import React, { useContext, useEffect, useState } from 'react';
import MealsContext from '../../context/MealsContext';
import useFetch from '../../hooks/useFetch';

export default function HeaderSearch() {
  const { filters: { searchInput }, setMeals } = useContext(MealsContext);
  // const [meals, setMeals] = useState([]);
  // const searchInput = 'orange';

  const urlBase = 'https://www.themealdb.com/api/json/v1/1/';
  const urlSearchIngredient = `${urlBase}filter.php?i=${searchInput}`;
  const urlSearchName = `${urlBase}search.php?s=${searchInput}`;
  const urlFirstLetter = `${urlBase}search.php?f=${searchInput}`;

  const [url, setUrl] = useState('');

  const firstLetterSearch = () => {
    if (searchInput.length === 1) return setUrl(urlFirstLetter);
    global.alert('Your search must have only 1 (one) character');
  };

  // input com estado controlado, falta setar o estado inicial para o ingredient-search

  // para a troca das urls de comida/bebida => "componendDidMount e componentWillUnmount para setar as flags de qual componente está ativo"

  const handleChange = ({ target: { name, value } }) => {
    console.log('handlechange');
    console.log(name, value);
    switch (value) {
    case 'ingredient-search':
      console.log('ingredient-search-case');
      setUrl(urlSearchIngredient);
      break;
    case 'name-search':
      console.log('name-search-case');
      setUrl(urlSearchName);
      break;
    case 'first-letter-search':
      console.log('first-letter-search-case');
      firstLetterSearch();
      break;
    default:
      throw new Error('invalid state');
    }
  };

  // const { data, isLoading, errorMessage } = useFetch(url);
  const { data } = useFetch(url);
  console.log('url depois do const data = useFetch', url);
  // if (data) console.log(data);

  const HandleBtn = (event) => {
    event.preventDefault();

    console.log(data.meals);
    setMeals(data.meals);
  };

  // console.log('searchInput', searchInput);
  console.log('Console log da URL', url);

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
      >
        Search
      </button>
    </form>
  );
}
