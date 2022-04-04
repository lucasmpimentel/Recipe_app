import React from 'react';
import PropTypes from 'prop-types';

export default class StartRecipe extends React.Component {
  render() {
    const { className } = this.props;
    return (
      <button
        type="button"
        className={ className }
      >
        Start Recipe
      </button>
    );
  }
}

StartRecipe.defaultProps = {
  className: '',
};

StartRecipe.propTypes = {
  className: PropTypes.string,
};
