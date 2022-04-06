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

  const handleClick = ({ target: { name } }) => {
    if (ingredients.includes(name)) {
      setIngredients(ingredients.filter((ingredient) => ingredient !== name));
    } else {
      setIngredients([...ingredients, name]);
    }
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
      const favs = readFavs() || {};
      saveFavs([...favs, recipe]);
    }
  };

  // const removeFavorite = (recipe) => {
  //   const favorites = readFavs();
  //   saveFavs(favorites.filter((favorite) => favorite.id !== recipe.id));
  // };

  // objeto da chave inProgressRecipes
  // const initialObject = {
  //   cocktails: {
  //      '${id}': [],
  //   },
  //   meals: {
  //      ' id-da-comida': [],
  //   }
  // }

  const handleChange = ({ target: { name } }) => {
    if (drinksInProgress) {
      console.log('entrou na drinksInProgress');
      addFav(recipeDetails.id);
    }
    console.log('------------------');
    console.log('handleChange');
    console.log(mealsInProgress);
    console.log(drinksInProgress);
    console.log(name);
    console.log(recipeDetails.id);
    console.log('------------------');
  };

  if (ingredients.length === landingIngs.length
    && ingredients.length !== 0 && landingIngs.length !== 0) {
    setFinishButtonDisabled(false);
  }
  if (ingredients.length < landingIngs.length) {
    setFinishButtonDisabled(true);
  }

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
                            // id={ ingredient }// aqui não adianta, nessa lógica só vem a string do ingrediente
                            name={ ingredient }
                            className="blablabla checkedIngredients"
                            onClick={ handleClick }
                            onChange={ handleChange }
                            // checked={ landingIngs.includes(ingredient) }
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
