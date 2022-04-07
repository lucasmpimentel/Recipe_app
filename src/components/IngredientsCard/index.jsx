/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import Context from '../../context/Context';
import './IngredientsCard.css';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const path = history.location.pathname;
  const recipeID = path.replace(/[^0-9]/g, '');

  // drink chegam null e meals chegam ''
  // const nullRecipe = typeRecipe === 'meals' ?  "" : null;
  const landingIngs = recipeDetails.ingredients.filter((recipe) => recipe !== "").filter((recipe) => recipe !== null);
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

  const landing = () => {
    console.log('dentro do landing');
    console.log(ingredients?.length);
    console.log(landingIngs?.length);
    if (ingredients?.length === landingIngs.length
      && ingredients.length !== 0 && landingIngs.length !== 0) {
      console.log('dentro do false do landing');
      return setFinishButtonDisabled(false);
    }
    return setFinishButtonDisabled(true);
  };
  landing();

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
