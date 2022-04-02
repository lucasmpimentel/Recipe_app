import React, { useState } from 'react';
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

  const filterMeals = () => setRender(render.filter(({ type }) => type === 'food'));
  const filterDrinks = () => setRender(render.filter(({ type }) => type === 'drink'));

  const removeFilters = () => {
    setRender([...doneRecipes]);
  };

  const copyClick = (id) => {
    copy(`http://localhost:3000/foods/${id}`);
    setIsLinkVisible(true);
  };

  const foods = (meal, index) => (
    <div key={ meal.name }>
      <img
        src={ meal.image }
        alt={ meal.name }
        data-testid={ `${index}-horizontal-image` }
        width="100px"
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${meal.nationality} - ${meal.category}`}
      </p>
      <p data-testid={ `${index}-horizontal-name` }>{meal.name}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{meal.doneDate}</p>
      <div
        role="button"
        tabIndex="0"
        onKeyPress={ (e) => e.key === 'Enter' && copyClick() }
        onClick={ () => copyClick(meal.id) }
        // textContent="Link copied!"
        // title="Link copied!"
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
      <img
        src={ drink.image }
        alt={ drink.name }
        data-testid={ `${index}-horizontal-image` }
        width="100px"
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{drink.alcoholicOrNot}</p>
      <p data-testid={ `${index}-horizontal-name` }>{drink.name}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{drink.doneDate}</p>
      <div
        role="button"
        tabIndex="0"
        onKeyPress={ (e) => e.key === 'Enter' && copyClick() }
        onClick={ () => copyClick(drink.id) }
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
