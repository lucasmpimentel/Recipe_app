import React, { useContext, useState } from 'react';
import Context from '../../context/Context';
import './IngredientsCard.css';

export default function IngredientsCard() {
  const { recipeDetails,
    mealsInProgress,
    drinksInProgress,
  } = useContext(Context);

  const [buttonDisabled, setButtonDisabled] = useState('false');
  // const [buttons, setButtons] = useState([]);

  const handleClick = ({ target, target: { name } }) => {
    const ingredients = recipeDetails.ingredients.filter((recipe) => recipe !== null);
    console.log(ingredients.length);
    console.log(target);
    console.log(name);

    // if já existe no localStorage passar a "removeFavorite", se não existe passar a AddFav;
    // quando o tamanho do localstorage for igual ao ingredients.length definido acima, habilitar o botão;

  };

  // function checkItem({ target }) {
  //   console.log(target);
  //   console.log(recipeDetails);
  // }

  const INGR = mealsInProgress ? 'meals' : 'cocktails';

  const readFavs = () => JSON.parse(localStorage.getItem(INGR));

  const saveFavs = (recipe) => localStorage.setItem(INGR, JSON.stringify(recipe));

  const addFav = (recipe) => {
    if (recipe) {
      const favs = readFavs() || [];
      saveFavs([...favs, recipe]);
    }
  };

  const removeFavorite = (recipe) => {
    const favorites = readFavs();
    saveFavs(favorites.filter((favorite) => favorite.id !== recipe.id));
  };

  // objeto da chave inProgressRecipes
  // const initialObject = {
  //   cocktails: {
  //      '${id}': [],
  //   },
  //   meals: {
  //      ' id-da-comida': [],
  //   }
  // }

  const handleChange = (e) => {
    const { target } = e;
    if (target.checked) {
      setButtonDisabled('true');
    }
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
                      <td
                        data-testid={ `${index}-ingredient-step` }
                      >
                        <label
                          htmlFor={ ingredient }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          <input
                            type="checkbox"
                            id={ ingredient.id }
                            name={ ingredient }
                            className="blablabla checkedIngredients"
                            onClick={ handleClick }
                            onChange={ handleChange }
                            // disabled={ buttonDisabled }
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
      {!buttonDisabled && <input type="text" />}
    </div>
  );
}
