import React, { useState } from 'react';

function HeaderSearch() {
  const [searchRecipe, setSearchRecipe] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchFirstLetter, setsearchFirstLetter] = useState('');

  return (
    <form>
      <label htmlFor="search-recipe">
        <input
          type="radio"
          id="ingredient-search"
          name="search-recipe"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ setSearchRecipe }
          defaultChecked
        />
        Ingredient
      </label>

      <label htmlFor="search-recipe">
        <input
          type="radio"
          name="search-recipe"
          id="name-search"
          value="name"
          data-testid="name-search-radio"
          onChange={ handleSortPlanets }
        />
        Name
      </label>

      <label htmlFor="search-recipe">
        <input
          type="radio"
          name="search-recipe"
          id="first-letter-search"
          value="first-letter"
          data-testid="first-letter-search-radio"
          onChange={ handleSortPlanets }
        />
        First Letter
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
        className="btn-ordenar"
      >
        Ordenar
      </button>

    </form>
  );
}

export default HeaderSearch;
