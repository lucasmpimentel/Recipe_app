import React, { useContext } from 'react';
import Context from '../../context/Context';
import './IngredientsCard.css';

export default function IngredientsCard() {
  const { recipeDetails,
    mealsInProgress,
    drinksInProgress,
  } = useContext(Context);

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
                      <td data-testid={ `${index}-ingredient-step` }>
                        <input
                          type="checkbox"
                        />
                      </td>
                    )
                  )}
                  <td data-testid={ `${index}-ingredient-name-and-measure` }>
                    {ingredient}
                  </td>
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
