import React, { useState } from 'react';
// import React, { useContext, useEffect, useState } from 'react';
// import MealsContext from '../context/MealsContext';
import useFetch from '../../hooks/useFetch';

export default function HeaderSearch() {
// ? confirmar como esse input vem do Req 12
//   const [searchInput] = useContext(MealsContext);
// const [meals, setMeals] = useState;
  const searchInput = 'orange';

  const urlBase = 'https://www.themealdb.com/api/json/v1/1/';
  // volta um objeto com um array meals
  const urlSearchIngredient = `${urlBase}filter.php?i=${searchInput}`;
  // Esse traz um objeto com array de objetos que tem o id, e a consulta com o id traz o objeto igual no por nome e primeira letra.
  // https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
  // "meals": [
  // {
  // "strMeal": "Chick-Fil-A Sandwich",
  // "strMealThumb": "https://www.themealdb.com/images/media/meals/sbx7n71587673021.jpg",
  // "idMeal": "53016"
  // },

  // objeto com array meals e chaves
  const urlSearchName = `${urlBase}search.php?s=${searchInput}`;
  // {
  // "meals": [
  // {
  // "idMeal": "52771",
  // "strMeal": "Spicy Arrabiata Penne",
  // "strDrinkAlternate": null,
  // "strCategory": "Vegetarian",
  // "strArea": "Italian",
  // "strInstructions": "Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.",
  // "strMealThumb": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
  // "strTags": "Pasta,Curry",
  // "strYoutube": "https://www.youtube.com/watch?v=1IszT_guI08",
  // "strIngredient1": "penne rigate",
  // "strIngredient2": "olive oil",
  // "strIngredient3": "garlic",
  // "strIngredient4": "chopped tomatoes",
  // "strIngredient5": "red chile flakes",
  // "strIngredient6": "italian seasoning",
  // "strIngredient7": "basil",
  // "strIngredient8": "Parmigiano-Reggiano",
  // "strIngredient9": "",
  // "strIngredient10": "",
  // "strIngredient11": "",
  // "strIngredient12": "",
  // "strIngredient13": "",
  // "strIngredient14": "",
  // "strIngredient15": "",
  // "strIngredient16": null,
  // "strIngredient17": null,
  // "strIngredient18": null,
  // "strIngredient19": null,
  // "strIngredient20": null,
  // "strMeasure1": "1 pound",
  // "strMeasure2": "1/4 cup",
  // "strMeasure3": "3 cloves",
  // "strMeasure4": "1 tin ",
  // "strMeasure5": "1/2 teaspoon",
  // "strMeasure6": "1/2 teaspoon",
  // "strMeasure7": "6 leaves",
  // "strMeasure8": "spinkling",
  // "strMeasure9": "",
  // "strMeasure10": "",
  // "strMeasure11": "",
  // "strMeasure12": "",
  // "strMeasure13": "",
  // "strMeasure14": "",
  // "strMeasure15": "",
  // "strMeasure16": null,
  // "strMeasure17": null,
  // "strMeasure18": null,
  // "strMeasure19": null,
  // "strMeasure20": null,
  // "strSource": null,
  // "strImageSource": null,
  // "strCreativeCommonsConfirmed": null,
  // "dateModified": null
  // }
  // ]
  // }

  const urlFirstLetter = `${urlBase}search.php?f=${searchInput.charAt(0)}`;

  const [url, setUrl] = useState(`${urlSearchIngredient}`);

  // preciso do value que vem do input do req12, para junto com o value de um dos 3 checkboxes definir qual url será pesquisada
  // caso seja a url do firstLetter, pegar somente a primeira letra do que for digitado

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

  // if (isLoading) return <h1>Loading...</h1>;

  const { data, isLoading, errorMessage } = useFetch(url);
  if (data) console.log(data);

  const mealsObj = {
    mealsResponse: data ? data.meals : [],
    isLoading,
    errorMessage,
  };

  const HandleBtn = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(mealsObj.mealsResponse);
  };

  console.log(url);
  console.log(useFetch(url));

  // www.themealdb.com/api/json/v1/1/lookup.php?i=52772

  // const mealIngredients = () => {
  //   meals.forEach((meal) => idMeal.map((id)=>useFetch)
  // }

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
