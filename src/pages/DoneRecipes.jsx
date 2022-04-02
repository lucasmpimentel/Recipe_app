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

// const doneFoods = doneRecipes.filter((recipe) => recipe.type === 'food');
// console.log(doneFoods);

// const doneDrink = doneRecipes.filter((recipe) => recipe.type === 'drink');
// console.log(doneDrink);
// const { tags } = doneDrinks;

const food = ({ id, image, category, name, doneDate, tags }, index) => {
  <div key={ id }>
    <img
      src={ image }
      alt={ name }
      data-testid={ `${index}-horizontal-image` }
      width="100px"
    />
    <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
    <p data-testid={ `${index}-horizontal-name` }>{name}</p>
    <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
    <img
      src={ shareIcon }
      alt="imagem de compartilhamento"
      data-testid={ `${index}-horizontal-share-btn` }
    />
    {tags && tags.map((tag, indexTag) => (
      <p
        data-testid={ `${indexTag}-${tag}-horizontal-tag` }
        key={ id }
      >
        {tag}
      </p>
    )) }
  </div>;
};

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
          meal.type === 'food' ? food(meal, index) : null
          // meal.type === 'food' ? <span>oi</span> : <span>blz?</span>
        ))}
    </>
  );
}
