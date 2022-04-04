import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const doneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const [render, setRender] = useState([...doneRecipes]);
  const [isLinkVisible, setIsLinkVisible] = useState(false);
  const history = useHistory();

  const filterMeals = () => {
    setRender([...doneRecipes]);
    setRender(render.filter(({ type }) => type === 'food'));
  };
  const filterDrinks = () => {
    setRender([...doneRecipes]);
    setRender(render.filter(({ type }) => type === 'drink'));
  };

  const removeFilters = () => {
    setRender([...doneRecipes]);
  };

  const copyClick = (id, type) => {
    setIsLinkVisible(true);
    return type === 'foods'
      ? copy(`http://localhost:3000/foods/${id}`)
      : copy(`http://localhost:3000/drinks/${id}`);
  };

  const toMealDetail = (idMeal) => history.push(`/foods/${idMeal}`);

  const toDrinkDetail = (idDrink) => history.push(`/drinks/${idDrink}`);

  const foods = (meal, index) => (
    <div
      key={ meal.name }
    >
      <div
        role="button"
        tabIndex="0"
        onClick={ () => (toMealDetail(meal.id)) }
        onKeyPress={ (e) => e.key === 'Enter' && toMealDetail(meal.id) }
      >
        <img
          src={ meal.image }
          alt={ meal.name }
          data-testid={ `${index}-horizontal-image` }
          width="100px"
        />
      </div>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${meal.nationality} - ${meal.category}`}
      </p>
      <div
        role="button"
        tabIndex="0"
        onClick={ () => (toMealDetail(meal.id)) }
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
      {meal.tags && meal.tags.map((tag) => (
        <p
          data-testid={ `${index}-${tag}-horizontal-tag` }
          key={ tag }
        >
          {tag}
        </p>
      )) }
    </div>
  );

  const drinks = (drink, index) => (
    <div key={ drink.name }>
      <div
        role="button"
        tabIndex="0"
        onClick={ () => (toDrinkDetail(drink.id)) }
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
        onClick={ () => (toDrinkDetail(drink.id)) }
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

    </div>
  );

  return (
    <>
      <Header />
      <p data-testid="page-title">Done Recipes</p>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ removeFilters }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterMeals }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks
      </button>
      {render && render
        .map((meal, index) => (
          meal.type === 'food'
            ? foods(meal, index)
            : drinks(meal, index)
        ))}
    </>
  );
}
