import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { disabled, testId, onClick, labelText } = this.props;
    return (
      <button
        type="button"
        disabled={ disabled }
        onClick={ onClick }
        data-testid={ testId }
      >
        { labelText }
      </button>
    );
  }
}

Button.propTypes = {
  testId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
