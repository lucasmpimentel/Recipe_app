import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import HeaderSearch from './HeaderSearch';

export default function Header({ searchTopBtn }) {
  const [showInput, setShowInput] = useState('true');
  const input = <input type="text" data-testid="search-input" />;
  return (

    <header>
      <h1> teste header </h1>
      <Link to="/Profile">
        <button type="button">
          <img
            src={ ProfileIcon }
            alt="Imagem do Perfil"
            data-testid="profile-top-btn"
          />
        </button>
      </Link>
      { !showInput && input }
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
