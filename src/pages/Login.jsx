import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

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
    history.push('/foods');
  };

  const handleChange = ({ target: { name, value } }) => {
    setUserState({ ...userState,
      [name]: value,
    });
  };

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
      return setIsDisabled(false);
    }
    setIsDisabled(true);
  }, [userState, setUserValue]);

  return (
    <main>
      <form onSubmit={ handleSubmit }>
        <input
          type="email"
          data-testid="email-input"
          name="userEmail"
          value={ userState.userEmail }
          placeholder={ userValue }
          onChange={ handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          name="userPassword"
          value={ userState.userPassword }
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </main>
  );
}
