import React from 'react';
import PropTypes from 'prop-types';

const KeyPressButton = (props) => (
  <div className="button-container">
    <p className="button-char">{props.char}</p>
    <p className="button-description">{props.description}</p>
  </div>
);

KeyPressButton.propTypes = {
  char: PropTypes.string.isRequired,
  description: PropTypes.string
}

export default KeyPressButton;