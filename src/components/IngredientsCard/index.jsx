/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import Context from '../../context/Context';
import './IngredientsCard.css';

export default function IngredientsCard() {
  const { recipeDetails,
    mealsInProgress,
    drinksInProgress,
    setFinishButtonDisabled,
  } = useContext(Context);
  const [savedSteps, setSavedSteps] = useLocalStorage(
    'inProgressRecipes', { cocktails: {}, meals: {} },
  );
  const typeRecipe = mealsInProgress ? 'meals' : 'cocktails';

  // drink chegam null e meals chegam ''
  const landingIngs = recipeDetails.ingredients.filter((recipe) => recipe !== null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getitem = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setIngredients(getitem[typeRecipe][recipeDetails.id]);
  }, [recipeDetails]);

  const handleClick = ({ target: { name } }) => {
    if (ingredients?.includes(name)) {
      const newIngredients = ingredients.filter((ingredient) => ingredient !== name);
      setIngredients(newIngredients);
      setSavedSteps(
        { ...savedSteps, [typeRecipe]: { [recipeDetails.id]: newIngredients } },
      );
    } else {
      let actualIngredients = [];
      if (ingredients) {
        actualIngredients = [...ingredients, name];
      } else {
        actualIngredients.push(name);
      }
      setSavedSteps(
        { ...savedSteps, [typeRecipe]: { [recipeDetails.id]: actualIngredients } },
      );
      setIngredients(actualIngredients);
    }
  };

  const landing = () => {
    if (ingredients?.length === landingIngs.length
    && ingredients.length !== 0 && landingIngs.length !== 0) {
      return setFinishButtonDisabled(false);
    }
    return setFinishButtonDisabled(true);
  };
  landing();

  const verifyIfChecked = (ingredient) => {
    const localRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (drinksInProgress && localRecipes) {
      const check = savedSteps[typeRecipe][recipeDetails.id]?.includes(ingredient);
      return check;
    }
    return false;
  };

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
                      <td>
                        <div data-testid={ `${index}-ingredient-step` }>
                          <label
                            htmlFor={ ingredient }
                            data-testid={ `${index}-ingredient-name-and-measure` }
                          >
                            <input
                              type="checkbox"
                              name={ ingredient }
                              value={ ingredient }
                              className="blablabla checkedIngredients"
                              onChange={ handleClick }
                              checked={ verifyIfChecked(ingredient) }
                            />
                            {ingredient}
                          </label>
                        </div>
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
    </div>
  );
}
