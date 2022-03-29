import React from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

export default function Header({ searchTopBtn }) {
  return (
    <header>
      <h1> teste header </h1>
      <img
        src={ ProfileIcon }
        alt="Imagem do Perfil"
        data-testid="profile-top-btn"
      />
      { searchTopBtn && (
        <img
          src={ SearchIcon }
          alt="Buscar"
          data-testid="search-top-btn"
        />)}
    </header>
  );
}

Header.propTypes = {
  searchTopBtn: PropTypes.bool.isRequired,
};

// importação de svg: https://stackoverflow.com/questions/42296499/how-to-display-svg-icons-svg-files-in-ui-using-react-component
