import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import ReactPlayer from 'react-player/file';
import Button from 'react-bootstrap/Button';
import useLocalStorage from '../hooks/useLocalStorage';
import { setMealsToken, setCocktailsToken } from '../services/setTokensLS';
import logo from '../images/Mestre-Cuca-logo.svg';
import './Login.css';

const loginVideo = require('../videos/loginVideo2.mp4');

export default function Login() {
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(true);
  const [userValue, setUserValue] = useLocalStorage('user', '');
  const [userState, setUserState] = useState({
    userEmail: '',
    userPassword: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setMealsToken(1);
    setCocktailsToken(1);
    history.push('/foods');
  };

  const handleChange = ({ target: { name, value } }) => {
    setUserState({ ...userState,
      [name]: value,
    });
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  // Como utilizar Regex e um guia de todas as expressões listadas dentro do regex
  // Solução: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  // Guia: https://regexr.com/3e48o
  useEffect(() => {
    const MIN_PASSWORD = 7;
    const isValidPassword = userState.userPassword.length >= MIN_PASSWORD;
    const regEx = /^[\wa-z0-9.-]+@[\wa-z0-9]+\.[a-z]+(\.+[a-z]+)?$/gi;
    const isValidEmail = regEx.test(userState.userEmail);
    if (isValidEmail && isValidPassword) {
      setUserValue({ email: userState.userEmail });
      if (userValue.email === userState.userEmail) {
        return setIsDisabled(false);
      }
    }
    setIsDisabled(true);
  }, [userState, setUserValue, userValue.email]);

  return (
    <main className="login-container">
      <video src={ loginVideo } className="login-video" autoPlay muted loop />
      <form className="login-form" onSubmit={ handleSubmit }>
        <img src={ logo } alt="Logomarca Mestra Cuca" className="logo-mestre-cuca" />
        <input
          type="email"
          data-testid="email-input"
          className="login-input"
          name="userEmail"
          value={ userState.userEmail }
          placeholder="Email"
          onChange={ handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          className="login-input"
          name="userPassword"
          value={ userState.userPassword }
          placeholder="Password"
          onChange={ handleChange }
        />
        <Button
          variant="primary"
          size="sm"
          type="submit"
          data-testid="login-submit-btn"
          className="login-submit-button"
          disabled={ isDisabled }
        >
          Enter
        </Button>
      </form>
    </main>
  );
}
