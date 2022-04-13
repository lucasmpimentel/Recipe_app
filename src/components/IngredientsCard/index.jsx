import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import Context from '../../context/Context';
import './IngredientsCard.css';
import landing from '../../helpers/Landing';

export default function IngredientsCard() {
  const { recipeDetails,
    mealsInProgress,
    // drinksInProgress,
    setFinishButtonDisabled,
  } = useContext(Context);

  const [savedSteps, setSavedSteps] = useLocalStorage(
    'inProgressRecipes', { cocktails: {}, meals: {} },
  );
  const typeRecipe = mealsInProgress ? 'meals' : 'cocktails';
  const history = useHistory();
  const path = history.location.pathname;
  const recipeID = path.replace(/[^0-9]/g, '');

  const landingIngs = recipeDetails.ingredients
    .filter((recipe) => recipe !== '')
    .filter((recipe) => recipe !== null)
    .filter((recipe) => recipe !== ' ');
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getitem = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setIngredients(getitem[typeRecipe][recipeID]);
  }, [recipeDetails]);

  const handleClick = ({ target: { name } }) => {
    if (ingredients?.includes(name)) {
      const newIngredients = ingredients.filter((ingredient) => ingredient !== name);
      setIngredients(newIngredients);
      setSavedSteps(
        { ...savedSteps, [typeRecipe]: { [recipeID]: newIngredients } },
      );
    } else {
      let actualIngredients = [];
      if (ingredients) {
        actualIngredients = [...ingredients, name];
      } else {
        actualIngredients.push(name);
      }
      setSavedSteps(
        { ...savedSteps, [typeRecipe]: { [recipeID]: actualIngredients } },
      );
      setIngredients(actualIngredients);
    }
  };

  landing(ingredients, landingIngs, setFinishButtonDisabled);

  const verifyIfChecked = (ingredient) => {
    const localRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localRecipes) {
      const check = savedSteps[typeRecipe][recipeID]?.includes(ingredient);
      return check;
    }
    return false;
  };

  return (
    <div>
      <div className="ingredients-table-container">
        <table>
          <tbody>
            {recipeDetails.ingredients
              .filter((ingredient) => ingredient !== '')
              .filter((ing) => ing !== null)
              .map((ingredient, index) => (
                <tr key={ index }>
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
                </tr>
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
                    {console.log(measure)}
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
