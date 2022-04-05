import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Context from '../context/Context';
import useLocalStorage from '../hooks/useLocalStorage';
import { fetchResults } from '../services/FetchMealOrDrink';
import IngredientsCard from '../components/IngredientsCard';
import Recomended from '../components/Recomended';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './DrinksDetails.css';

export default function DrinksDetails() {
  const history = useHistory();
  const [doneRecipes] = useLocalStorage('doneRecipes', '');
  const {
    setDrinksVisible,
    setMealsVisible,
    setRecipeDetails,
    recipeDetails,
  } = useContext(Context);
  const [allRecipeDetails, setAllRecipeDetails] = useState([]);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const actualPath = window.location.pathname;
  const CUT_INDEX = 8;
  const recipeID = actualPath.slice(CUT_INDEX);
  const recipeURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`;

  const saveIngredients = (drinks) => {
    const getIngredients = [];
    const getMeasures = [];
    try {
      Object.keys(drinks).forEach((key) => {
        if (key.includes('strIngredient')) {
          getIngredients.push(drinks[key]);
        }
      });
      Object.keys(drinks).forEach((key) => {
        if (key.includes('strMeasure')) {
          getMeasures.push(drinks[key]);
        }
      });
      setRecipeDetails({
        ...recipeDetails,
        ingredients: getIngredients,
        measures: getMeasures,
        instructions: drinks.strInstructions,
      });
    } catch (error) {
      console.log(`Fail to filter ingredients: ${error}`);
    }
  };

  const getDetails = async () => {
    try {
      const results = await fetchResults(recipeURL);
      setAllRecipeDetails(results.drinks[0]);
      saveIngredients(results.drinks[0]);
      return results;
    } catch (error) {
      console.log(`Error in fetch details: ${error}`);
    }
  };

  const checkRecipe = () => {
    if (doneRecipes !== '') {
      const result = doneRecipes.some((item) => item.id === recipeID);
      setAlreadyDone(result);
    }
  };

  useEffect(() => {
    setMealsVisible(false);
    setDrinksVisible(true);
    getDetails();
    checkRecipe();
  }, []);

  return (
    <main className="main-details">
      <div className="recipe-image">
        <img
          data-testid="recipe-photo"
          src={ allRecipeDetails.strDrinkThumb }
          alt="Recipe"
        />
      </div>
      <header className="title-container">
        <h1 data-testid="recipe-title">{allRecipeDetails.strDrink}</h1>
        <div>
          <button data-testid="share-btn" type="button">
            <img src={ shareIcon } alt="Share" />
          </button>
          <button data-testid="favorite-btn" type="button">
            <img src={ whiteHeartIcon } alt="favorite" />
          </button>
        </div>
      </header>
      <div
        className="recipe-categorie"
        data-testid="recipe-category"
      >
        {allRecipeDetails.strCategory}
        {' '}
        {allRecipeDetails.strAlcoholic}
      </div>
      <IngredientsCard />
      <Recomended />
      { !alreadyDone && (
        <Button
          variant="danger"
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/drinks/${recipeID}/in-progress`) }
        >
          Start Recipe
        </Button>
      ) }
    </main>
  );
}
