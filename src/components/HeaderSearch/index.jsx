import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { fetchData } from '../../services/FetchMealOrDrink';

export default function HeaderSearch() {
  const { filters: { searchInput },
    setMeals,
    setDrinks,
    mealsVisible,
    drinksVisible,
    setState,
  } = useContext(Context);
  const history = useHistory();

  const [search, setSearch] = useState({
    searchCat: 'ingredient-search',
  });

  const handleChange = ({ target: { name, value } }) => {
    setSearch(() => ({
      [name]: value,
    }));
  };

  const handleResults = (data) => {
    // console.log(Object.values(data.meals[0]));
    const MAX = 12;
    if (data.meals) {
      const { meals } = data;
      setMeals(meals.filter((_meal, index) => index < MAX));
      if (data.meals.length === 1) {
        const url = `/foods/${data.meals[0].idMeal}`;
        history.push(url);
      }
      return;
    }
    if (data.drinks) {
      const { drinks } = data;
      setDrinks(drinks.filter((_drink, index) => index < MAX));
      if (data.drinks.length === 1) {
        const url = `/drinks/${data.drinks[0].idDrink}`;
        history.push(url);
      }
      return;
    }
    return global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const { searchCat } = search;
    const data = await fetchData(searchInput, searchCat, mealsVisible, drinksVisible);
    setState((prevState) => ({
      filters: { ...prevState.filters, searchInput: '' },
    }));
    setSearch(search);
    handleResults(data);
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
        onClick={ handleSearch }
      >
        Search
      </button>
    </form>
  );
}
