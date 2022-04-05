import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import Button from 'react-bootstrap/Button';
import Context from '../context/Context';
import { fetchResults } from '../services/FetchMealOrDrink';
import IngredientsCard from '../components/IngredientsCard';
import Recomended from '../components/Recomended';
import useLocalStorage from '../hooks/useLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './DrinksDetails.css';

export default function FoodsDetails() {
  const history = useHistory();
  const [doneRecipes] = useLocalStorage('doneRecipes', '');
  const {
    setMealsVisible,
    setDrinksVisible,
    setRecipeDetails,
    recipeDetails,
  } = useContext(Context);
  const [allRecipeDetails, setAllRecipeDetails] = useState([]);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const actualPath = window.location.pathname;
  const CUT_INDEX = 7;
  const recipeID = actualPath.slice(CUT_INDEX);
  const recipeURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`;

  const saveIngredients = (meals) => {
    const getIngredients = [];
    const getMeasures = [];
    try {
      Object.keys(meals).forEach((key) => {
        if (key.includes('strIngredient')) {
          getIngredients.push(meals[key]);
        }
      });
      Object.keys(meals).forEach((key) => {
        if (key.includes('strMeasure')) {
          getMeasures.push(meals[key]);
        }
      });
      setRecipeDetails({
        ...recipeDetails,
        ingredients: getIngredients,
        measures: getMeasures,
        instructions: meals.strInstructions,
      });
    } catch (error) {
      console.log(`Fail to filter ingredients: ${error}`);
    }
  };

  const getDetails = async () => {
    try {
      const results = await fetchResults(recipeURL);
      setAllRecipeDetails(results.meals[0]);
      saveIngredients(results.meals[0]);
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
    setMealsVisible(true);
    setDrinksVisible(false);
    getDetails();
    checkRecipe();
  }, []);

  return (
    <main className="main-details">
      <div className="recipe-image">
        <img
          data-testid="recipe-photo"
          src={ allRecipeDetails.strMealThumb }
          alt="Recipe"
        />
      </div>
      <header className="title-container">
        <h1 data-testid="recipe-title">{allRecipeDetails.strMeal}</h1>
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
      </div>
      <IngredientsCard />
      <ReactPlayer
        data-testid="video"
        className="video"
        url={ allRecipeDetails.strYoutube }
      />
      <Recomended />
      { !alreadyDone && (
        <Button
          variant="danger"
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/foods/${recipeID}/in-progress`) }
        >
          Start Recipe
        </Button>
      ) }
    </main>
  );
}
