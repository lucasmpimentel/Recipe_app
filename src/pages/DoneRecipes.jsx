import React from 'react';
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

const foods = (meal, index) => (
  <div key={ meal.id }>
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
    <img
      src={ shareIcon }
      alt="imagem de compartilhamento"
      data-testid={ `${index}-horizontal-share-btn` }
    />
    {meal.tags && meal.tags.map((tag) => (
      <p
        data-testid={ `${index}-${tag}-horizontal-tag` }
        key={ index }
      >
        {tag}
      </p>
    )) }
  </div>
);

const drinks = (drink, index) => (
  <div key={ drink.id }>
    <img
      src={ drink.image }
      alt={ drink.name }
      data-testid={ `${index}-horizontal-image` }
      width="100px"
    />
    <p data-testid={ `${index}-horizontal-top-text` }>{drink.category}</p>
    <p data-testid={ `${index}-horizontal-name` }>{drink.name}</p>
    <p data-testid={ `${index}-horizontal-done-date` }>{drink.doneDate}</p>
    <img
      src={ shareIcon }
      alt="imagem de compartilhamento"
      data-testid={ `${index}-horizontal-share-btn` }
    />
  </div>
);

export default function DoneRecipes() {
  return (
    <>
      <Header />
      <p data-testid="page-title">Done Recipes</p>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {doneRecipes && doneRecipes
        .map((meal, index) => (
          meal.type === 'food'
            ? foods(meal, index)
            : drinks(meal, index)
        ))}
    </>
  );
}
