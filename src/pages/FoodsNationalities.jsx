import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

export default function FoodsNationalities() {
  const history = useHistory();
  const [country, setCountry] = useState('American');
  const clickMeal = (idMeal) => history.push(`/foods/${idMeal}`);
  const [allCountryRecepies, setAllCountryRecepies] = useState([]);

  const {
    allCountries,
  } = useContext(Context);

  // const fetchSelectCountries = async () => {
  //   try {
  //     const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  //     const results = await response.json();
  //     const countrie = results.meals;
  //     const onlyCountries = countrie.map((item) => item.strArea);
  //     setAllCountries(onlyCountries);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const showMeal = async (value) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
      const allMealsCountry = await response.json();
      const MAX = 12;
      const countryMeals = allMealsCountry.meals.filter((_country, index) => index < MAX);
      setAllCountryRecepies(countryMeals);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async ({ target: { value } }) => {
    setCountry(value);
    showMeal(value);
  };

  // useEffect(() => {
  //   fetchSelectCountries();
  // }, []);

  useEffect(() => {
    showMeal(country);
  }, [country]);

  return (
    <>
      <Header searchTopBtn />
      <p data-testid="page-title">Explore Nationalities</p>

      <select
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
      </select>

      {allCountryRecepies.map(({ strMeal, strMealThumb, idMeal }, index) => (
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
    </>
  );
}
