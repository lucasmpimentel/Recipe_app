import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import IngredientsCard from '../components/IngredientsCard';
import Context from '../context/Context';
import { fetchResults } from '../services/FetchMealOrDrink';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './DrinksDetails.css';
import { fetchMealFav, readFavs } from '../utils/localStorage';

const copy = require('clipboard-copy');

export default function FoodsDetails() {
  const history = useHistory();
  const {
    setMealsVisible,
    setRecipeDetails,
    recipeDetails,
    setMealsInProgress,
    finishButtonDisabled,
  } = useContext(Context);
  const [allRecipeDetails, setAllRecipeDetails] = useState([]);
  const [isLinkVisible, setIsLinkVisible] = useState(false);

  const path = history.location.pathname;
  const recipeID = path.replace(/[^0-9]/g, '');

  // const actualPath = window.location.pathname;
  // const CUT_INDEX = 7;
  // const END_INDEX = 12;
  // const recipeID = actualPath.slice(CUT_INDEX, END_INDEX);
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
        id: recipeID,
      });
    } catch (error) {
      console.log(`Fail to filter ingredients: ${error}`);
    }
  };

  const getDetails = async () => {
    setMealsVisible(true);
    try {
      const results = await fetchResults(recipeURL);
      setAllRecipeDetails(results.meals[0]);
      saveIngredients(results.meals[0]);
      return results;
    } catch (error) {
      console.log(`Error in fetch details: ${error}`);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => () => {
    setMealsVisible(false);
  },
  [setMealsVisible]);

  useEffect(() => {
    setMealsInProgress(true);
  }, [setMealsInProgress]);

  useEffect(() => () => {
    setMealsInProgress(false);
  },
  [setMealsInProgress]);

  const copyClick = () => {
    setIsLinkVisible(true);
    copy(`http://localhost:3000/foods/${recipeID}`);
  };

  const addOrRemove = async () => {
    fetchMealFav(recipeID);
    const favorites = readFavs();
    console.log(favorites);
    const isFavorite = favorites.some((fav) => fav.id === recipeID);
    console.log(isFavorite);
  };

  return (
    <main className="main-details">
      <img
        className="recipe-image"
        data-testid="recipe-photo"
        src={ allRecipeDetails.strMealThumb }
        alt="Recipe"
      />
      <header className="title-container">
        <h1 data-testid="recipe-title">{allRecipeDetails.strMeal}</h1>

        <div
          role="button"
          tabIndex="0"
          onKeyPress={ (e) => e.key === 'Enter' && copyClick() }
          onClick={ () => copyClick() }
        >
          <button data-testid="share-btn" type="button">
            <img src={ shareIcon } alt="Share" />
          </button>
          {isLinkVisible && <p>Link copied!</p>}
        </div>

        {/* <button data-testid="favorite-btn" type="button"> */}
        <div
          role="button"
          tabIndex="0"
          onKeyPress={ (e) => e.key === 'Enter' && addOrRemove() }
          onClick={ () => addOrRemove() }
        >
          <img
            // src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            src={ blackHeartIcon }
            alt="favorite"
            data-testid="favorite-btn"
          />
        </div>
        {/* </button> */}

      </header>
      <div
        className="recipe-categorie"
        data-testid="recipe-category"
      >
        {allRecipeDetails.strCategory}
      </div>
      <IngredientsCard />
      <embed data-testid="video" src={ allRecipeDetails.strYoutube } />
      {/* <Recomended /> */}
      <Button
        variant="danger"
        className="finish-recipe-btn"
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
        disabled={ finishButtonDisabled }
      >
        Finish Recipe
      </Button>
    </main>
  );
}
