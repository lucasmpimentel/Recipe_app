import React, { useState } from 'react';

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
    case 'userEmail':
      setUserEmail(value);
      break;
    case 'userPassword':
      setUserPassword(value);
      break;
    default:
      throw new Error('invalid state');
    }
  };

  return (
    <main>
      <form onSubmit={ handleSubmit }>
        <input
          type="email"
          data-testid="email-input"
          name="userEmail"
          value={ userEmail }
          onChange={ handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          name="userPassword"
          value={ userPassword }
          onChange={ handleChange }
        />
        <button type="submit" data-testid="login-submit-btn">Enter</button>
      </form>
    </main>
  );
}
