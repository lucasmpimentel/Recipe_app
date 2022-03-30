import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  function clearStorage() {
    if (localStorage) { // Check if the localStorage object exists
      localStorage.clear(); // clears the localstorage
    } else {
      global.alert('Sorry, no local storage.'); // an alert if localstorage is non-existing
    }
  //   if clearStorage.clear() && history.push('/');
  }

  return (
    <>
      <Header />
      <p data-testid="page-title">Profile</p>
      <p data-testid="profile-email">
        Este é meu email
      </p>
      <Link to="/done-recipes">
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          {' '}
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          {' '}
          Favorite Recipes
        </button>
      </Link>
      <Link to="/logout">
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ clearStorage }
        >
          {' '}
          Logout
        </button>
      </Link>
      <Footer />
    </>
  );
}

// maneiras de limpar o localstorage https://stackoverflow.com/questions/7667958/clearing-localstorage-in-javascript
