import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function FoodsNationalities() {
  const history = useHistory();
  const [allCountries, setAllCountries] = useState([]);
  const [country, setCountry] = useState(['American']);
  const [allCountryRecepies, setAllCountryRecepies] = useState([]);
  const clickMeal = (idMeal) => history.push(`/foods/${idMeal}`);

  const fetchSelectCountries = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const results = await response.json();
    const countrie = results.meals;
    const onlyCountries = countrie.map((item) => item.strArea);
    setAllCountries(onlyCountries);
    return response.ok ? Promise.resolve(results) : Promise.reject(results);
  };
  const showMeal = async (value) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
    const allMealsCountry = await response.json();
    const MAX = 12;
    const countryMeals = allMealsCountry.meals.filter((_country, index) => index < MAX);
    console.log(countryMeals);
    setAllCountryRecepies(countryMeals);
    return response.ok ? Promise.resolve(allMealsCountry)
      : Promise.reject(allMealsCountry);
  };
  const handleChange = async ({ target: { value } }) => {
    setCountry(value);
    showMeal(value);
  };

  useEffect(() => {
    fetchSelectCountries();
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
