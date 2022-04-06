import React, { useContext, useState, useEffect } from 'react';
import Context from '../../context/Context';
import './IngredientsCard.css';

export default function IngredientsCard() {
  const { recipeDetails,
    mealsInProgress,
    drinksInProgress,
    setFinishButtonDisabled,
  } = useContext(Context);

  // drink chegam null e meals chegam ''
  const landingIngs = recipeDetails.ingredients.filter((recipe) => recipe !== null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }, []);

  const setInProgresRecipes = (checkedIngredients) => {
    const KEY = 'inProgressRecipes';
    const prevRecipes = JSON.parse(localStorage.getItem(KEY) || {});
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

  const landing = () => {
    if (ingredients.length === landingIngs.length
    && ingredients.length !== 0 && landingIngs.length !== 0) {
      setFinishButtonDisabled(false);
    }
    if (ingredients.length) return setInProgresRecipes(ingredients);

    const KEY = 'inProgressRecipes';
    const drinks = JSON.parse(localStorage.getItem(KEY) || {});
    if (drinks) console.log(Object.keys(drinks.cocktails)[0]);
    const drinkInProgress = Object.keys(drinks.cocktails)[0];
    if (drinksInProgress) console.log(drinkInProgress);

    if (!ingredients.length && drinkInProgress) {
      console.log('entrou aqui');
    }

    //     removeAccount(state, account){
    //   const accounts = JSON.parse(localStorage.getItem('accounts'));
    //   delete accounts[account.apikey];
    //   localStorage.setItem("accounts", JSON.stringify(accounts));
    // }
  };
  landing();

  // se no estado local o tamanho do array for 0 e no local storage existir a chave com o id do drink ou meal, esse id deve ser removido.

  // const verifyIfChecked = (ingredient) => {
  //   const localRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   if (drinksInProgress && localRecipes) {
  //     console.log(localRecipes.cocktails[recipeDetails.id]);
  //     const check = localRecipes.cocktails[recipeDetails.id].includes(ingredient);
  //     console.log(check);
  //     return check;
  //   }
  //   return false;
  // };

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
                            value={ ingredient }
                            className="blablabla checkedIngredients"
                            onChange={ handleClick }
                            // checked={ verifyIfChecked(ingredient) }
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
    </div>
  );
}
