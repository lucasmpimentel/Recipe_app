import React, { useContext, useState } from 'react';
import Context from '../../context/Context';
import './IngredientsCard.css';

export default function IngredientsCard() {
  const { recipeDetails,
    mealsInProgress,
    drinksInProgress,
    setFinishButtonDisabled,
  } = useContext(Context);

  const landingIngs = recipeDetails.ingredients.filter((recipe) => recipe !== '');
  const [ingredients, setIngredients] = useState([]);

  const setInProgresRecipes = (checkedIngredients) => {
    const KEY = 'inProgressRecipes';
    const prevRecipes = JSON.parse(localStorage.getItem(KEY) || '{}');
    const prevCocktails = prevRecipes.cocktails;
    const prevMeals = prevRecipes.meals;
    const recipeObj = {
      cocktails: {
        ...prevCocktails,
        ...(drinksInProgress && { [recipeDetails.id]: [...checkedIngredients] }),
      },
      meals: {
        ...prevMeals,
        ...(mealsInProgress && { [recipeDetails.id]: [...checkedIngredients] }),
      },
    };
    localStorage.setItem(KEY, JSON.stringify(recipeObj));
  };

  const handleClick = ({ target: { name } }) => {
    if (ingredients.includes(name)) {
      setIngredients(ingredients.filter((ingredient) => ingredient !== name));
    } else {
      setIngredients([...ingredients, name]);
    }
  };

  if (ingredients.length === landingIngs.length
    && ingredients.length !== 0 && landingIngs.length !== 0) {
    setFinishButtonDisabled(false);
  }
  if (ingredients.length < landingIngs.length) {
    setFinishButtonDisabled(true);
  }
  if (ingredients.length) setInProgresRecipes(ingredients);

  return (
    <div>
      <div className="ingredients-table-container">
        <table>
          <tbody>
            { recipeDetails.ingredients.map((ingredient, index) => (
              ingredient !== '' && (
                <tr key={ index }>
                  { (mealsInProgress || drinksInProgress) && (
                    (ingredient !== null) && (
                      <td
                        data-testid={ `${index}-ingredient-step` }
                      >
                        <label
                          htmlFor={ ingredient }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          <input
                            type="checkbox"
                            name={ ingredient }
                            className="blablabla checkedIngredients"
                            onClick={ handleClick }
                            // checked={ ingredients.includes(ingredient) }
                          />
                          {ingredient}
                        </label>
                      </td>
                    )
                  )}

                </tr>
              )
            ))}
          </tbody>
        </table>
        <table>
          <tbody>
            { recipeDetails.measures.map((measure, index) => (
              measure !== ' ' && (
                <tr key={ index }>
                  <td data-testid={ `${index}-ingredient-name-and-measure` }>
                    {measure}
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
      <div className="instructions" data-testid="instructions">
        {recipeDetails.instructions}
      </div>
      {/* {!buttonDisabled && <input type="text" />} */}
    </div>
  );
}
