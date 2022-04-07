import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getSavedValue } from '../hooks/useLocalStorage';
import './profile.css';

export default function Profile() {
  const history = useHistory();

  const user = getSavedValue('user');

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main className="main-profile">
      <Header />
      <section className="buttons">
        <p className="title" data-testid="page-title">Profile</p>
        { typeof user === 'undefined' ? <p>Usuário indefinido</p>
          : <p data-testid="profile-email">{ user.email }</p>}
        <Button
          className="done-recepies"
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          {' '}
          Done Recipes
        </Button>
        <Button
          className="favorite"
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          {' '}
          Favorite Recipes
        </Button>
        <Button
          className="logout"
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleLogout }
        >
          {' '}
          Logout
        </Button>
      </section>
      <Footer />
    </main>
  );
}

// maneiras de limpar o localstorage https://stackoverflow.com/questions/7667958/clearing-localstorage-in-javascript
