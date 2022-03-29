import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DrinksProvider from './context/DrinksProvider';
import MealsProvider from './context/MealsProvider';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import DrinksIngredients from './pages/DrinksIngredients';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Foods from './pages/Foods';
import FoodsIngredients from './pages/FoodsIngredients';
import FoodsNationalities from './pages/FoodsNationalities';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import FoodsDetails from './pages/FoodsDetails';
import DrinksDetails from './pages/DrinksDetails';
import FoodsInProgress from './pages/FoodsInProgress';
import DrinksInProgress from './pages/DrinksInProgress';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => (
  <MealsProvider>
    <DrinksProvider>
      <Switch>
        <Route exact path="/" component={ Login } />

        {/* tela principal receita e drinks */}
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />

        {/* detalhe da receita ou drink */}
        <Route exact path="/foods/:id" component={ FoodsDetails } />
        <Route exact path="/drinks/:id" component={ DrinksDetails } />

        {/* tela da receita em progresso da comida e bebida */}
        <Route exact path="/foods/:id/in-progress" component={ FoodsInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />

        {/* telas de explorar */}
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />

        {/* telas de explorar */}
        <Route exact path="/explore/foods/ingredients" component={ FoodsIngredients } />
        <Route exact path="/explore/drinks/ingredients" component={ DrinksIngredients } />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodsNationalities }
        />

        {/* telas de perfil, receitas prontas e favoritadas */}
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />

        {/* tela de notFound */}
        <Route path="*" component={ NotFound } />
      </Switch>

    </DrinksProvider>
  </MealsProvider>

);

export default App;
