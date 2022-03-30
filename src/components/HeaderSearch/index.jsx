import React, { useState, useContext } from 'react';
// import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';
import { fetchMeal } from '../../services/FetchMealOrDrink';

export default function HeaderSearch() {
  const { filters: { searchInput },
    setMeals,
    mealsVisible,
    drinksVisible,
  } = useContext(Context);

  const [search, setSearch] = useState({
    searchCat: 'ingredient-search',
  });

  const handleChange = ({ target: { name, value } }) => {
    console.log('entrei na handle change');
    setSearch(() => ({
      [name]: value,
    }));
  };

  const HandleSearch = (event) => {
    event.preventDefault();
    const { searchCat } = search;
    const data = fetchMeal(searchInput, searchCat, mealsVisible, drinksVisible);
    setMeals(data);
    setSearch(search);
  };

  return (
    <form>
      <label htmlFor="searchCat">
        <input
          type="radio"
          id="ingredient-search"
          name="searchCat"
          value="ingredient-search"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
          defaultChecked
        />
        Ingredient
      </label>

      <label htmlFor="searchCat">
        <input
          type="radio"
          name="searchCat"
          id="name-search"
          value="name-search"
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
        Name
      </label>

      <label htmlFor="searchCat">
        <input
          type="radio"
          name="searchCat"
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
