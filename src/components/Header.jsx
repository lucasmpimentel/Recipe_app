import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import HeaderSearch from './HeaderSearch';
import Context from '../context/Context';

export default function Header({ searchTopBtn }) {
  const history = useHistory();
  const { filters: { searchInput }, setFilter } = useContext(Context);
  const [showInput, setShowInput] = useState('false');

  const handleChange = ({ target: { name, value } }) => {
    setFilter(name, value);
  };

  return (

    <header>
      <h1> teste header </h1>
      <button type="button" onClick={ () => history.push('/profile') }>
        <img
          src={ ProfileIcon }
          alt="Imagem do Perfil"
          data-testid="profile-top-btn"
        />
      </button>
      {!showInput
              && <input
                type="text"
                data-testid="search-input"
                name="searchInput"
                value={ searchInput }
                onChange={ handleChange }
              />}
      { searchTopBtn && (
        <button
          type="button"
          onClick={ () => { setShowInput(!showInput); } }
        >
          <img
            src={ SearchIcon }
            alt="Buscar"
            data-testid="search-top-btn"
          />
        </button>
      )}
      { !showInput && <HeaderSearch /> }
    </header>
  );
}

Header.propTypes = {
  searchTopBtn: PropTypes.bool.isRequired,
};

// importação de svg: https://stackoverflow.com/questions/42296499/how-to-display-svg-icons-svg-files-in-ui-using-react-component
