import React from 'react';
import PropTypes from 'prop-types';
require('./KeyPressButton.scss');

class KeyPressButton extends React.Component {
  render() {
    const { char, description, active } = this.props;
    return (
      <div className={`button-container ${active ? 'active' : ''}`}>
        <p className="button-char">{char}</p>
        <p className="button-description">{description}</p>
      </div>
    );
  } 
}
  
KeyPressButton.propTypes = {
  char: PropTypes.string.isRequired,
  description: PropTypes.string
}

export default KeyPressButton;