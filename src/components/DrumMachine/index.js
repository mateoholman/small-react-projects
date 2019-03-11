import React from 'react';
import PropTypes from 'prop-types';
import KeyPressButton from '../KeyPressButton';

require('./DrumMachine.scss');

class DrumMachine extends React.Component {
  componentDidMount() {
    window.addEventListener("keypress", this.handleKeyPress);
  }
  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeyPress);
  }
  handleKeyPress(e) {
    console.info('Keypress info: ', e);
  }
  render() {
    const { drumKit } = this.props;
    return (
      <div className="drum-machine-container">
        {
          drumKit &&
          drumKit.map(kit =>
            <KeyPressButton
              key={kit.char}
              char={kit.char}
              description={kit.description}
            />
          )
        }
        {
          (!drumKit || drumKit.length < 1) &&
          (<p>Please add items to your drum kit!</p>)
        }
      </div>
    );
  }
}

DrumMachine.propTypes = {
  drumKit: PropTypes.arrayOf(
    PropTypes.shape({
      char: PropTypes.string,
      description: PropTypes.string,
      audioSource: PropTypes.string
    })
  ).isRequired
}

export default DrumMachine;