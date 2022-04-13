import React, { useState/* , useContext */, useEffect, Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
// import Context from '../../context/Context';
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs';
import { fetchResults } from '../../services/FetchMealOrDrink';
import './Recomended.css';

export default function Recomended() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideIndex2, setSlideIndex2] = useState(1);
  const [recomended, setRecomended] = useState([]);
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { length } = recomended;

  const fetchRecomended = async (url, key) => {
    const MAX_RECOMENDED = 6;
    try {
      const response = await fetchResults(url);
      setRecomended(response[key].slice(0, MAX_RECOMENDED));
    } catch (error) {
      console.log(`Erro no fetch do carousel: ${error}`);
    }
  };

  useEffect(() => {
    if (window.location.pathname.includes('foods')) {
      fetchRecomended(drinksURL, 'drinks');
    } else {
      fetchRecomended(mealsURL, 'meals');
    }
  }, []);

  const nextCard = () => {
    setSlideIndex(slideIndex2 === length - 1 ? 0 : slideIndex + 2);
    setSlideIndex2(slideIndex2 === length - 1 ? 1 : slideIndex2 + 2);
  };

  const prevCard = () => {
    setSlideIndex(slideIndex === 0 ? length - 2 : slideIndex - 2);
    setSlideIndex2(slideIndex === 0 ? length - 1 : slideIndex2 - 2);
  };

  return (
    <Suspense fallback={ <Spinner /> }>
      <div className="recomended-component">
        <section className="recomended-container">
          <BsArrowLeftSquare className="left-arrow" onClick={ prevCard } />
          <BsArrowRightSquare className="right-arrow" onClick={ nextCard } />
          <div
            className="inner-slider"
          >
            { recomended.length !== 0 && (
              recomended.map((item, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <p
                    className="slide"
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {item.strDrink || item.strMeal}
                  </p>
                  { index === slideIndex && (
                    <div
                      className="recomended-item"
                      role="link"
                      tabIndex={ 0 }
                      onKeyPress="Enter"
                      onClick={ () => '' }
                    >
                      <img
                        className="recomended-image"
                        src={ item.strDrinkThumb || item.strMealThumb }
                        alt="Recomendação"
                      />
                      <div className="recomended-item-info">
                        <h4
                          data-testid={ `${slideIndex}-recomendation-title` }
                          className="recomended-title"
                        >
                          {item.strDrink || item.strMeal}
                        </h4>
                        <p className="recomended-category">{item.strCategory}</p>
                        { item.strAlcoholic && (
                          <span className="rec-alcoholic">{item.strAlcoholic}</span>
                        ) }
                      </div>
                    </div>
                  ) }
                  { index === slideIndex2 && (
                    <div className="recomended-item">
                      <img
                        className="recomended-image"
                        src={ item.strDrinkThumb || item.strMealThumb }
                        alt="Recomendação"
                      />
                      <div className="recomended-item-info">
                        <h4
                          data-testid={ `${slideIndex2}-recomendation-title` }
                          className="recomended-title"
                        >
                          {item.strDrink || item.strMeal}
                        </h4>
                        <p className="recomended-category">{item.strCategory}</p>
                        { item.strAlcoholic && (
                          <span className="rec-alcoholic">{item.strAlcoholic}</span>
                        ) }
                      </div>
                    </div>
                  ) }
                </div>
              ))) }
          </div>
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
    </Suspense>
  );
}
