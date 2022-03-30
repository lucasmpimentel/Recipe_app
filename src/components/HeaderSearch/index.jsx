import React, { useState, useContext } from 'react';
// import React, { useContext, useEffect, useState } from 'react';
import MealsContext from '../../context/MealsContext';
import useFetch from '../../hooks/useFetch';

export default function HeaderSearch() {
  const { filters: { searchInput }, setMeals } = useContext(MealsContext);

  const urlBase = 'https://www.themealdb.com/api/json/v1/1/';
  const [url, setUrl] = useState(`${urlBase}filter.php?i=${searchInput}`);

  const [search, setSearch] = useState({
    search: 'ingredient-search',
  });

  const firstLetterSearch = () => {
    if (searchInput.length === 1) return setUrl(`${urlBase}search.php?f=${searchInput}`);
    global.alert('Your search must have only 1 (one) character');
  };

  // para a troca das urls de comida/bebida => "componendDidMount e componentWillUnmount para setar as flags de qual componente está ativo"

  const buildUrl = () => {
    console.log(search.search);
    switch (search.search) {
    case 'ingredient-search':
      console.log('ingredient-search-case');
      setUrl(`${urlBase}filter.php?i=${searchInput}`);
      break;
    case 'name-search':
      console.log('name-search-case');
      setUrl(`${urlBase}search.php?s=${searchInput}`);
      break;
    case 'first-letter-search':
      console.log('first-letter-search-case');
      firstLetterSearch();
      break;
    default:
      throw new Error('invalid state');
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    console.log('entrei na handle change');
    setSearch(() => ({
      [name]: value,
    }));
    buildUrl();
  };

  // aqui vem "atrasado"
  const { data } = useFetch(url);

  // console.log('url no corpo do react function component', url);

  const HandleSearch = (event) => {
    event.preventDefault();
    console.log(search.search);
    console.log(searchInput);
    buildUrl();
    console.log(url);
    setMeals(data.meals);
    setSearch(search);
  };

  return (
    <form>
      <label htmlFor="search">
        <input
          type="radio"
          id="ingredient-search"
          name="search"
          value="ingredient-search"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
          defaultChecked
        />
        Ingredient
      </label>

      <label htmlFor="search">
        <input
          type="radio"
          name="search"
          id="name-search"
          value="name-search"
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
        Name
      </label>

      <label htmlFor="search">
        <input
          type="radio"
          name="search"
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
        onClick={ HandleSearch }
      >
        Search
      </button>
    </form>
  );
}
