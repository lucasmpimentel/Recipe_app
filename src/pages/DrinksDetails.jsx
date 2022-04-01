import React from 'react';
import './startRecipeButton.css';

export default function DrinksDetails() {
  return (
    <div>
      <p>Drinks Details</p>
      <button
        type="button"
        className="startRecipe"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}
