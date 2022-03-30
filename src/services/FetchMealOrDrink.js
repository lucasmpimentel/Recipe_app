const fetchMealOrDrink = async (url) => {
  const response = await fetch(`${url}`);
  const json = await response.json();
  const MAX = 12;
  let { meals } = json;
  meals = meals.filter((_data, index) => index < MAX);
  console.log(meals);

  return response.ok ? Promise.resolve(meals) : Promise.reject(meals);
};

// Meal
const mealByName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const mealByFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const mealByIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

// Drinks
const drinkByName = 'www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const drinkByFirstLetter = 'www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const drinksByIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

const mealOrDrink = (mealsVisible, drinksVisible) => {
  console.log('entrou na meals or drink');
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
  console.log('entrou na firstLetterSearch');
  const { byFirstLetter } = mealOrDrink(mealsVisible, drinksVisible);
  if (searchInput.length === 1) {
    return fetchMealOrDrink(`${byFirstLetter}${searchInput}`);
  }
  global.alert('Your search must have only 1 (one) character');
};

export const fetchMeal = (searchInput, search, mealsVisible, drinksVisible) => {
  const { byName, byIngredient } = mealOrDrink(mealsVisible, drinksVisible);
  if (search === 'ingredient-search') {
    fetchMealOrDrink(`${byIngredient}${searchInput}`);
  } else if (search === 'name-search') {
    fetchMealOrDrink(`${byName}${searchInput}`);
  } else if (search === 'first-letter-search') {
    firstLetterSearch(searchInput, mealsVisible, drinksVisible);
  }
};

export default fetchMealOrDrink;
