import React from 'react';

export default function FoodsDetails() {
  return (
    <main>
      <header>
        <img src="#" alt="Recipe" />
        FoodsDetails
      </header>
      <h1>Nome da Receita</h1>
      <IngredientsCard />
      <InstructionsCard />
      {/* Aqui vai vir um video */}
      <Recomended />
      <button type="button">Start Recipe</button>
    </main>
  );
}
