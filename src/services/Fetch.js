// Meal
const mealByName = `www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
const mealByFirstLetter = `www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
const mealById = `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
const mealByIngredient = `www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;

// Drinks

// const url // switch/case

const fetchMealOrDrink = async () => {
  const response = await fetch(`${url}`);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default fetchMealOrDrink;
