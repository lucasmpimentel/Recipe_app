import { addMealFav, readFavs, removeFavorite } from '../utils/localStorage';

const addOrRemove = async (recipeID, setIsFavorite) => {
  let favorites = readFavs();
  if (favorites?.some((fav) => fav.id === recipeID)) {
    const fav = favorites.filter((favorite) => favorite.id === recipeID);
    removeFavorite(fav);
    favorites = readFavs();
    setIsFavorite(favorites?.some((favorite) => favorite.id === recipeID));
    // console.log('removi o favorito');
    return;
  }
  // console.log('chamei a addMealFav que adiciona favorito');
  addMealFav(recipeID, setIsFavorite);
};

export default addOrRemove;
