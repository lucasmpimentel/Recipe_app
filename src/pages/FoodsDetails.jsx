import React from 'react';
import './startRecipeButton.css';

export default function FoodsDetails() {
  return (
    <div>
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
