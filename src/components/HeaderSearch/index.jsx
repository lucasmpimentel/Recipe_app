import React, { useState, useContext } from 'react';
// import React, { useContext, useEffect, useState } from 'react';
import MealsContext from '../../context/MealsContext';
import useFetch from '../../hooks/useFetch';

export default function HeaderSearch() {
  const { filters: { searchInput }, setMeals } = useContext(MealsContext);

  const urlBase = 'https://www.themealdb.com/api/json/v1/1/';
  const urlSearchIngredient = `${urlBase}filter.php?i=${searchInput}`;
  const urlSearchName = `${urlBase}search.php?s=${searchInput}`;
  const urlFirstLetter = `${urlBase}search.php?f=${searchInput}`;
  const [url, setUrl] = useState(urlSearchIngredient);

  const [search, setSearch] = useState({
    search: 'ingredient-search',
  });

  const firstLetterSearch = () => {
    if (searchInput.length === 1) return setUrl(urlFirstLetter);
    global.alert('Your search must have only 1 (one) character');
  };

  const handleChange = ({ target: { name, value } }) => {
    setSearch(() => ({
      [name]: value,
    }));
  };

  // para a troca das urls de comida/bebida => "componendDidMount e componentWillUnmount para setar as flags de qual componente está ativo"

  const buildUrl = () => {
    console.log(search);
    switch (search.search) {
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

  const { data } = useFetch(url);

  const HandleSearch = (event) => {
    event.preventDefault();
    buildUrl();
    console.log('url no handleSearch', url);
    // const { value } = search;
    console.log(data.meals);
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
