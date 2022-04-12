import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import Context from '../../context/Context';
import './IngredientsCard.css';
import landing from '../../helpers/Landing';

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

  const landingIngs = recipeDetails.ingredients
    .filter((recipe) => recipe !== '')
    .filter((recipe) => recipe !== null);
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

  // function originalImplementation(A, B) {
  //   if (A && B) {
  //     console.log("do something 1");
  //   } else {
  //     if (B) {
  //       console.log("set some boolean to false");
  //     }
  //     console.log("do something 2");
  //   }
  // }

  // function newImplementation(A, B) {
  //   if (A && B) {
  //     console.log("do something 1");
  //   }
  //   else if (B) {
  //     console.log("set some boolean to false");
  //   }
  //   if (!A || !B) {
  //     console.log("do something 2");
  //   }
  // }

  // console.log("originalImplementation");

  // originalImplementation(0, 0);
  // originalImplementation(0, 1);
  // originalImplementation(1, 0);
  // originalImplementation(1, 1);

  // console.log("newImplementation");

  // newImplementation(0, 0);
  // newImplementation(0, 1);
  // newImplementation(1, 0);
  // newImplementation(1, 1);

  // const landing = () => {
  //   // console.log('dentro do landing');
  //   // console.log(ingredients?.length);
  //   // console.log(landingIngs?.length);
  //   if (ingredients?.length === landingIngs.length
  //     && ingredients.length !== 0 && landingIngs.length !== 0) {
  //     // console.log('dentro do false do landing');
  //     return setFinishButtonDisabled(false);
  //   }
  //   return setFinishButtonDisabled(true);
  // };

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
