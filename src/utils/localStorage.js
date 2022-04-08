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
  // console.log('recipe', recipe[0].id);
  const favorites = readFavs();
  if (favorites.length === 1) {
    localStorage.setItem(FAV_REC, JSON.stringify([]));
    return;
  }
  console.log(favorites);
  saveFavs(favorites.filter((favorite) => favorite.id !== recipe[0].id));
  console.log(favorites.filter((favorite) => favorite.id !== recipe[0].id));
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

const saveAllFavs = () => [...favorite];

const addMeal = ({ meals }, setIsFavorite, recipeID) => {
  const data = {
    id: meals[0].idMeal,
    type: 'food',
    nationality: meals[0].strArea,
    category: meals[0].strCategory,
    alcoholicOrNot: '',
    name: meals[0].strMeal,
    image: meals[0].strMealThumb,
  };
  addFav(data);
  const favorites = readFavs();
  setIsFavorite(favorites?.some((fav) => fav.id === recipeID));
  return data;
};

const addMealFav = async (recipeID, setIsFavorite) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`;
  const response = await fetch(url);
  const results = await response.json();
  addMeal(results, setIsFavorite, recipeID);
  // return response.ok ? Promise.resolve(results) : Promise.reject(results);
};

export {
  readFavs,
  saveFavs,
  addFav,
  removeFavorite,
  favorite,
  doneRecipes,
  saveAllFavs,
  addMealFav,
};
