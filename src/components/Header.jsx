import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import logoMC from '../images/Mestre-Cuca-logo.svg';
import HeaderSearch from './HeaderSearch';
import Context from '../context/Context';
import './header.css';

export default function Header({ searchTopBtn }) {
  const history = useHistory();
  const { filters: { searchInput }, setFilter } = useContext(Context);
  const [showInput, setShowInput] = useState('false');

  const handleChange = ({ target: { name, value } }) => {
    setFilter(name, value);
  };

  return (

    <header className="header">
      <Button
        variant="outline-info"
        className="header-buttons"
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          className="header-icons"
          src={ ProfileIcon }
          alt="Imagem do Perfil"
          data-testid="profile-top-btn"
        />
      </Button>
      {showInput && <img className="logo-header" src={ logoMC } alt="logomarca app" />}
      {!showInput
              && <input
                className="input-header"
                type="text"
                data-testid="search-input"
                name="searchInput"
                value={ searchInput }
                placeholder="Search"
                onChange={ handleChange }
              />}
      { searchTopBtn && (
        <Button
          variant="outline-info"
          className="header-buttons"
          type="button"
          onClick={ () => { setShowInput(!showInput); } }
        >
          <img
            className="header-icons"
            src={ SearchIcon }
            alt="Buscar"
            data-testid="search-top-btn"
          />
        </Button>
      )}
      { !showInput && <HeaderSearch /> }
    </header>
  );
}

Header.propTypes = {
  searchTopBtn: PropTypes.bool.isRequired,
};

// importação de svg: https://stackoverflow.com/questions/42296499/how-to-display-svg-icons-svg-files-in-ui-using-react-component
