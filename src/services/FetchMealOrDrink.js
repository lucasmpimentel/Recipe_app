const fetchMealOrDrink = async (url) => {
  const response = await fetch(`${url}`);
  const json = await response.json();
  const MAX = 12;
  if (json.meals) {
    const { meals } = json;
    return meals;
  }
  if (json.drinks) {
    const { drinks } = json;
    return drinks;
  }
  let results = json.meals ? meals : drinks;
  results = results.filter((_data, index) => index < MAX);
  console.log(meals);
  return response.ok ? Promise.resolve(results) : Promise.reject(results);
};

// Meal
const mealByName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const mealByFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const mealByIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

// Drinks
const drinkByName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const drinkByFirstLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const drinksByIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

// could be an if/else or even only if, but I think this way is more clear.
const mealOrDrink = (mealsVisible, drinksVisible) => {
  if (mealsVisible) {
    const byName = mealByName;
    const byFirstLetter = mealByFirstLetter;
    const byIngredient = mealByIngredient;
    return { byName, byFirstLetter, byIngredient };
  }
  if (drinksVisible) {
    const byName = drinkByName;
    const byFirstLetter = drinkByFirstLetter;
    const byIngredient = drinksByIngredient;
    return { byName, byFirstLetter, byIngredient };
  }
};

const firstLetterSearch = (searchInput, mealsVisible, drinksVisible) => {
  const { byFirstLetter } = mealOrDrink(mealsVisible, drinksVisible);
  if (searchInput.length === 1) {
    return fetchMealOrDrink(`${byFirstLetter}${searchInput}`);
  }
  global.alert('Your search must have only 1 (one) character');
};

export const fetchData = async (searchInput, search, mealsVisible, drinksVisible) => {
  const { byName, byIngredient } = mealOrDrink(mealsVisible, drinksVisible);
  if (search === 'ingredient-search') {
    const results = await fetchMealOrDrink(`${byIngredient}${searchInput}`);
    return results;
  }
  if (search === 'name-search') {
    const results = fetchMealOrDrink(`${byName}${searchInput}`);
    return results;
  }
  if (search === 'first-letter-search') {
    return firstLetterSearch(searchInput, mealsVisible, drinksVisible);
  }
};

export default fetchMealOrDrink;
