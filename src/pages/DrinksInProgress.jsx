import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import IngredientsCard from '../components/IngredientsCard';
import Context from '../context/Context';
import { fetchResults } from '../services/FetchMealOrDrink';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './DrinksDetails.css';

export default function DrinksDetails() {
  const history = useHistory();
  const {
    setDrinksVisible,
    setRecipeDetails,
    recipeDetails,
    setDrinksInProgress,
    finishButtonDisabled,
  } = useContext(Context);
  const [allRecipeDetails, setAllRecipeDetails] = useState([]);
  // const [buttonDisabled, setButtonDisabled] = useState('false');
  const actualPath = window.location.pathname;
  const CUT_INDEX = 8;
  const END_INDEX = -12;
  const recipeID = actualPath.slice(CUT_INDEX, END_INDEX);
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
        id: drinks.idDrink,
      });
    } catch (error) {
      console.log(`Fail to filter ingredients: ${error}`);
    }
  };

  const getDetails = async () => {
    setDrinksVisible(true);
    try {
      const results = await fetchResults(recipeURL);
      setAllRecipeDetails(results.drinks[0]);
      saveIngredients(results.drinks[0]);
      return results;
    } catch (error) {
      console.log(`Error in fetch details: ${error}`);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => () => {
    setDrinksVisible(false);
  },
  [setDrinksVisible]);

  useEffect(() => {
    setDrinksInProgress(true);
  }, [setDrinksInProgress]);

  useEffect(() => () => {
    setDrinksInProgress(false);
  },
  [setDrinksInProgress]);

  return (
    <main className="main-details">
      <img
        className="recipe-image"
        data-testid="recipe-photo"
        src={ allRecipeDetails.strDrinkThumb }
        alt="Recipe"
      />
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
      {/* <Recomended /> */}
      <Button
        variant="danger"
        className="finish-recipe-btn"
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ finishButtonDisabled }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
      </Button>
    </main>
  );
}
