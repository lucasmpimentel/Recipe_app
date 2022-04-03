// const INITIAL = [
//   { id, type, nationality, category, alcoholicOrNot, name, image },
// ];

const FAV_REC = 'favoriteRecipes';

const readFavs = () => JSON.parse(localStorage.getItem(FAV_REC));

const saveFavs = (recipe) => localStorage.setItem(FAV_REC, JSON.stringify(recipe));

const addFav = (recipe) => {
  if (recipe) {
    const favs = readFavs() || [];
    saveFavs([...favs, recipe]);
  }
};

const removeFavorite = (recipe) => {
  console.log('recipe recebeida na removeFavorite', recipe);
  const favorites = readFavs();
  console.log(favorites);
  saveFavs(favorites.filter((favorite) => favorite.id !== recipe.id));
};

const favorite = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image:
    'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image:
    'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

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

export { readFavs, saveFavs, addFav, removeFavorite, favorite, doneRecipes };
