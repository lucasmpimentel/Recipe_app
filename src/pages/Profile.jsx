import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Profile() {
  const [email, setEmail] = useState('email@email.com');
  const [userValue] = useLocalStorage('user', '');
  const history = useHistory();

  useEffect(() => {
    setEmail(userValue.email);
  }, [userValue]);

  const handleLogout = () => {
    history.push('/');
  };

  return (
    <>
      <Header />
      <p data-testid="page-title">Profile</p>
      { typeof email === 'undefined' ? <p>Usuário indefinido</p>
        : <p data-testid="profile-email">{ email }</p>}
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        {' '}
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        {' '}
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleLogout }
      >
        {' '}
        Logout
      </button>
      <Footer />
    </>
  );
}

// maneiras de limpar o localstorage https://stackoverflow.com/questions/7667958/clearing-localstorage-in-javascript
