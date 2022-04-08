import { fetchMealFav, readFavs, removeFavorite } from '../utils/localStorage';

const addOrRemove = async (recipeID) => {
  const favorites = readFavs();
  if (favorites?.some((fav) => fav.id === recipeID)) {
    const fav = favorites.filter((favorite) => favorite.id === recipeID);
    removeFavorite(fav);
    return;
  }
  console.log('não entrei no remover favorito');
  console.log(recipeID);
  fetchMealFav(recipeID);
};

export default addOrRemove;
