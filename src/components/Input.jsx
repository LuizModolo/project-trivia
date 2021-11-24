import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { testId, type, value, name, onChange, placeholder } = this.props;
    return (
      <div>
        <label htmlFor={ testId }>
          <input
            data-testid={ testId }
            id={ testId }
            type={ type }
            value={ value }
            name={ name }
            onChange={ onChange }
            placeholder={ placeholder }
          />
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  testId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
