import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { removeFavorite, readFavs } from '../utils/localStorage';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [render, setRender] = useState(readFavs());
  const [isLinkVisible, setIsLinkVisible] = useState(false);
  const history = useHistory();

  // useEffect(() => {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(''));
  //   addFav(favorite[0]);
  //   addFav(favorite[1]);
  // }, []);

  const filterMeals = () => {
    setRender(readFavs());
    setRender(render.filter(({ type }) => type === 'food'));
  };
  const filterDrinks = () => {
    setRender(readFavs());
    setRender(render.filter(({ type }) => type === 'drink'));
  };

  const removeFilters = () => {
    setRender(readFavs());
  };

  const copyClick = (id, type) => {
    const ONE_SEC = 1000;
    setIsLinkVisible(true);
    setTimeout(() => setCopied(false), ONE_SEC);
    return type === 'foods'
      ? copy(`http://localhost:3000/foods/${id}`)
      : copy(`http://localhost:3000/drinks/${id}`);
  };

  const toMealDetail = (idMeal) => history.push(`/foods/${idMeal}`);

  const toDrinkDetail = (idDrink) => history.push(`/drinks/${idDrink}`);

  const removeFav = (recipe) => {
    console.log('cliquei na remove favorite');
    removeFavorite(recipe);
    setRender(readFavs());
  };

  const foods = (meal, index) => (
    <div key={ meal.name }>
      <div
        role="button"
        tabIndex="0"
        onClick={ () => toMealDetail(meal.id) }
        onKeyPress={ (e) => e.key === 'Enter' && toMealDetail(meal.id) }
      >
        <img
          src={ meal.image }
          alt={ meal.name }
          data-testid={ `${index}-horizontal-image` }
          width="100px"
        />
      </div>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${meal.nationality} - ${meal.category}`}
      </p>
      <div
        role="button"
        tabIndex="0"
        onClick={ () => toMealDetail(meal.id) }
        onKeyPress={ (e) => e.key === 'Enter' && toMealDetail(meal.id) }
      >
        <p data-testid={ `${index}-horizontal-name` }>{meal.name}</p>
      </div>

      <p data-testid={ `${index}-horizontal-done-date` }>{meal.doneDate}</p>
      <div
        role="button"
        tabIndex="0"
        onKeyPress={ (e) => e.key === 'Enter' && copyClick(meal.id, 'foods') }
        onClick={ () => copyClick(meal.id, 'foods') }
      >
        <img
          src={ shareIcon }
          alt="imagem de compartilhamento"
          data-testid={ `${index}-horizontal-share-btn` }
        />
        {isLinkVisible && <p>Link copied!</p>}
      </div>
      <div
        role="button"
        tabIndex="0"
        onKeyPress={ (e) => e.key === 'Enter' && removeFav(meal) }
        onClick={ () => removeFav(meal) }
      >
        <img
          src={ blackHeartIcon }
          alt="imagem de favorita"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </div>
    </div>
  );

  const drinks = (drink, index) => (
    <div key={ drink.name }>
      <div
        role="button"
        tabIndex="0"
        onClick={ () => toDrinkDetail(drink.id) }
        onKeyPress={ (e) => e.key === 'Enter' && toDrinkDetail(drink.id) }
      >
        <img
          src={ drink.image }
          alt={ drink.name }
          data-testid={ `${index}-horizontal-image` }
          width="100px"
        />
      </div>
      <p data-testid={ `${index}-horizontal-top-text` }>{drink.alcoholicOrNot}</p>
      <div
        role="button"
        tabIndex="0"
        onClick={ () => toDrinkDetail(drink.id) }
        onKeyPress={ (e) => e.key === 'Enter' && toDrinkDetail(drink.id) }
      >
        <p data-testid={ `${index}-horizontal-name` }>{drink.name}</p>
      </div>
      <p data-testid={ `${index}-horizontal-done-date` }>{drink.doneDate}</p>
      <div
        role="button"
        tabIndex="0"
        onKeyPress={ (e) => e.key === 'Enter' && copyClick(meal.id, 'drinks') }
        onClick={ () => copyClick(drink.id, 'drinks') }
      >
        <img
          src={ shareIcon }
          alt="imagem de compartilhamento"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </div>
      {isLinkVisible && <p>Link copied!</p>}
      <div
        role="button"
        tabIndex="0"
        onKeyPress={ (e) => e.key === 'Enter' && removeFav(drink) }
        onClick={ () => removeFav(drink) }
      >
        <img
          src={ blackHeartIcon }
          alt="imagem de favorita"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </div>
    </div>
  );
  return (
    <>
      <Header />
      <p data-testid="page-title">Favorite Recipes</p>
      <Button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ removeFilters }
      >
        All
      </Button>
      <Button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterMeals }
      >
        Food
      </Button>
      <Button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks
      </Button>
      {render
        && render.map((meal, i) => (meal.type === 'food'
          ? foods(meal, i) : drinks(meal, i)))}
    </>
  );
}
