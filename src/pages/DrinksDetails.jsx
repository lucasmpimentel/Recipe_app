import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import './FoodsAndDrinksDetails.css';

export default function DrinksDetails() {
  const history = useHistory();
  const [doneRecipes] = useLocalStorage('doneRecipes', '');
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const { setRecipeDetails, recipeDetails } = useContext(Context);
  const [allRecipeDetails, setAllRecipeDetails] = useState([]);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const actualPath = window.location.pathname;
  const CUT_INDEX = 8;
  const recipeID = actualPath.slice(CUT_INDEX);
  const recipeURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`;

  const saveIngredients = (type, data) => {
    const getValues = [];
    try {
      Object.keys(data).forEach((key) => {
        if (key.includes(type)) {
          getValues.push(data[key]);
        }
      });
      return getValues;
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
        results.drinks[0],
      );
      const makeMeasures = saveIngredients('strMeasure', results.drinks[0]);
      setAllRecipeDetails(results.drinks[0]);
      setRecipeDetails(
        {
          ...recipeDetails,
          ingredients: [...makeIngredients],
          measures: [...makeMeasures],
          instructions: results.drinks[0].strInstructions,
          id: recipeID,
        },
      );
      return results.drinks[0];
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
      <div className="white-glass">
        <div className="recipe-image">
          <img
            data-testid="recipe-photo"
            src={ allRecipeDetails.strDrinkThumb }
            alt="Recipe"
          />
        </div>
        <header className="title-container">
          <h1
            className="title-details"
            data-testid="recipe-title"
          >
            {allRecipeDetails.strDrink}
          </h1>
          <Button
            variant="outline-info"
            className="share-details-btn"
            data-testid="share-btn"
            type="button"
            onClick={ copyLink }
          >
            <img className="share-like-details-icon" src={ shareIcon } alt="Share" />
          </Button>
          <Button
            variant="outline-info"
            className="share-details-btn"
            data-testid="favorite-btn"
            type="button"
            onClick={ handleFavorite }
          >
            <img
              className="share-like-details-icon"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="favorite"
            />
          </Button>
        </header>
        { copied && <span className="copied">Link copied!</span> }
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
      </div>
    </main>
  );
}
