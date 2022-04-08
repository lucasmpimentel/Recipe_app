import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { fetchResults } from '../services/FetchMealOrDrink';
import './foodsNationalities.css';

export default function FoodsNationalities() {
  const history = useHistory();
  const [country, setCountry] = useState('American');
  const clickMeal = (idMeal) => history.push(`/foods/${idMeal}`);
  const [allCountryRecepies, setAllCountryRecepies] = useState([]);

  const {
    allCountries,
  } = useContext(Context);

  const showMeal = async (value) => {
    try {
      const { meals } = await fetchResults(value);
      const MAX = 12;
      const countryMeals = meals.filter((_country, index) => index < MAX);
      setAllCountryRecepies(countryMeals);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = async ({ target: { value } }) => {
    setCountry(value);
    showMeal(value);
  };

  useEffect(() => {
    if (!allCountryRecepies.length) {
      showMeal('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
    if (country === 'All') {
      showMeal('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      showMeal(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
    }
  }, [country]);

  return (
    <main className="main-nationalities">
      <Header searchTopBtn />
      <p className="title" data-testid="page-title">Explore Nationalities</p>

      <select
        className="countries"
        data-testid="explore-by-nationality-dropdown"
        name={ country }
        onChange={ handleChange }
        value={ country }
      >
        {allCountries.map((nationality) => (
          <option
            value={ nationality }
            data-testid={ `${nationality}-option` }
            key={ nationality }
          >
            {nationality}
          </option>
        ))}
        <option data-testid="All-option">All</option>
      </select>

      {allCountryRecepies
        .map(({ strMeal, strMealThumb, idMeal }, index) => (
          <div
            role="button"
            tabIndex="0"
            key={ idMeal }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => (clickMeal(idMeal)) }
            onKeyPress={ (e) => e.key === 'Enter' && clickMeal(idMeal) }
          >
            <img
              src={ strMealThumb }
              width="100px"
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{strMeal}</p>
          </div>

        ))}
      <Footer />
    </main>
  );
}
