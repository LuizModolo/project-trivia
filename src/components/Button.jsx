import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { disabled, testId, onClick, labelText, className } = this.props;
    return (
      <button
        type="button"
        disabled={ disabled }
        onClick={ onClick }
        data-testid={ testId }
        className={ className }
      >
        { labelText }
      </button>
    );
  }
}

Button.propTypes = {
  testId: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  className: 'x',
  testId: 'x',
};

export default Button;
