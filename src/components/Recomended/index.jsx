import React, { useState/* , useContext */, useEffect } from 'react';
// import Context from '../../context/Context';
import { fetchResults } from '../../services/FetchMealOrDrink';
import './Recomended.css';

export default function Recomended() {
  /* const { mealsVisible, drinksVisible } = useContext(Context); */
  const [recomended, setRecomended] = useState([]);
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const fetchRecomended = async (url) => {
    const MAX_RECOMENDED = 6;
    try {
      const response = await fetchResults(url);
      if (response.drinks) {
        setRecomended(response.drinks.slice(0, MAX_RECOMENDED));
      }
      if (response.meals) {
        setRecomended(response.meals.slice(0, MAX_RECOMENDED));
      }
    } catch (error) {
      console.log(`Erro no fetch do carousel: ${error}`);
    }
  };

  useEffect(() => {
    if (window.location.pathname.includes('foods')) {
      fetchRecomended(drinksURL);
    }
    if (window.location.pathname.includes('drinks')) {
      fetchRecomended(mealsURL);
    }
  }, []);

  return (
    <div className="recomended-carousel-container">
      <section className="recomended-container">
        { recomended.map((item, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            tabIndex={ index }
            key={ index }
            className="recomended-item"
          >
            <img
              className="recomended-image"
              src={ item.strDrinkThumb || item.strMealThumb }
              alt="Recomendação"
            />
            <div className="recomended-item-info">
              <h4 className="recomended-title">{item.strDrink || item.strMeal}</h4>
              <p className="recomended-category">{item.strCategory}</p>
              { item.strAlcoholic && (
                <span className="rec-alcoholic">{item.strAlcoholic}</span>
              ) }
            </div>
          </div>
        )) }
      </section>
      <div className="dots-container">
        <span
          tabIndex="0"
          role="link"
          alt="Slide dot"
          className="dot"
          onKeyPress={ () => console.log('apertou no dot1') }
          onClick={ () => console.log('') }
        />
        <span
          tabIndex="0"
          role="link"
          alt="Slide dot"
          className="dot"
          onKeyPress={ () => console.log('apertou no dot2') }
          onClick={ () => console.log('') }
        />
        <span
          tabIndex="0"
          role="link"
          alt="Slide dot"
          className="dot"
          onKeyPress={ () => console.log('apertou no dot3') }
          onClick={ () => console.log('') }
        />
      </div>
    </div>
  );
}
