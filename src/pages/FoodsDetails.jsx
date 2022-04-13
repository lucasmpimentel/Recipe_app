import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Button from 'react-bootstrap/Button';
import copy from 'clipboard-copy';
import Context from '../context/Context';
import useLocalStorage from '../hooks/useLocalStorage';
import { fetchResults } from '../services/FetchMealOrDrink';
import IngredientsCard from '../components/IngredientsCard';
import Recomended from '../components/Recomended';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './DrinksDetails.css';

export default function FoodsDetails() {
  const history = useHistory();
  const [doneRecipes] = useLocalStorage('doneRecipes', []);
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const { setRecipeDetails, recipeDetails } = useContext(Context);
  const [allRecipeDetails, setAllRecipeDetails] = useState([]);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const actualPath = window.location.pathname;
  const CUT_INDEX = 7;
  const recipeID = actualPath.slice(CUT_INDEX);
  const recipeURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`;

  const saveIngredients = (type, recipeKey, data) => {
    const getValues = [];
    try {
      Object.keys(data).forEach((key) => {
        if (key.includes(type)) {
          getValues.push(data[key]);
        }
      });
      const result = { [recipeKey]: getValues };
      return result;
    } catch (error) {
      console.log(`Fail to filter ingredients: ${error}`);
    }
  };

  const checking = (param) => {
    if (param.length !== 0) {
      const result = param.some((item) => Object.values(item).includes(recipeID));
      return result;
    }
    return false;
  };

  const getDetails = async () => {
    try {
      const results = await fetchResults(recipeURL);
      const makeIngredients = saveIngredients(
        'strIngredient',
        'ingredients',
        results.meals[0],
      );
      const makeMeasures = saveIngredients('strMeasure', 'measures', results.meals[0]);
      setAllRecipeDetails(results.meals[0]);
      setRecipeDetails(
        {
          ...recipeDetails,
          ingredients: [...makeIngredients.ingredients],
          measures: [...makeMeasures.measures],
          instructions: results.meals[0].strInstructions,
        },
      );
      return results.meals[0];
    } catch (error) {
      console.log(`Error in fetch details: ${error}`);
    }
  };

  const copyLink = () => {
    const ONE_SEC = 1000;
    copy(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), ONE_SEC);
  };

  const handleFavorite = () => {
    if (isFavorite) {
      const newFav = favoriteRecipes.filter((item) => item.id !== recipeID);
      setFavoriteRecipes([...newFav]);
      return setIsFavorite(false);
    }
    setFavoriteRecipes([...favoriteRecipes, allRecipeDetails]);
    return setIsFavorite(true);
  };

  const getRecipeStatus = () => {
    setAlreadyDone(checking(doneRecipes));
    setIsFavorite(checking(favoriteRecipes));
  };

  useEffect(() => {
    getDetails();
    getRecipeStatus();
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
          <button data-testid="share-btn" type="button" onClick={ copyLink }>
            <img src={ shareIcon } alt="Share" />
          </button>
          <button data-testid="favorite-btn" type="button" onClick={ handleFavorite }>
            <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="favorite" />
          </button>
        </div>
      </header>
      { copied && <span>Link copied!</span> }
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
