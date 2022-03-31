export function setMealsToken(value) {
  localStorage.setItem('mealsToken', JSON.stringify(value));
}

export function setCocktailsToken(value) {
  localStorage.setItem('cocktailsToken', JSON.stringify(value));
}
