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

const firstLetterSearch = (searchInput) => {
  console.log('entrou na firstLetterSearch');
  if (searchInput.length === 1) {
    return fetchMealOrDrink(`${mealByFirstLetter}${searchInput}`);
  }
  global.alert('Your search must have only 1 (one) character');
};

export const fetchMeal = (searchInput, search) => {
  if (search === 'ingredient-search') {
    fetchMealOrDrink(`${mealByIngredient}${searchInput}`);
  } else if (search === 'name-search') {
    fetchMealOrDrink(`${mealByName}${searchInput}`);
  } else if (search === 'first-letter-search') {
    firstLetterSearch(searchInput);
  }
};

// Drinks

// const url // switch/case

export default fetchMealOrDrink;
