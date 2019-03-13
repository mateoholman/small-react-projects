import React from 'react';
import PropTypes from 'prop-types';
import KeyPressButton from '../KeyPressButton';

require('./DrumMachine.scss');

class DrumMachine extends React.Component {
  state = {
    drumKit: [],
    drumKitKeys: []
  };

  componentDidMount() {
    if (this.props.drumKit && this.props.drumKit.length > 0) {
      const drumKitKeys = this.props.drumKit.map(kit => kit.char);
      this.setState({ drumKitKeys: drumKitKeys });
    }
    this.setState({ drumKit: this.props.drumKit });
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeyPress);
  }

  handleKeyDown(e) {
    if (this.state.drumKitKeys.find(k => k === e.key)){
      const oldKit = [...this.state.drumKit]
      const activeElement = oldKit.find(kit => kit.char === e.key);
      activeElement.active = true;
      this.setState({ drumKit: oldKit });
    }

  }

  handleKeyUp(e) {
    const oldKit = [...this.state.drumKit]
    const activeElement = oldKit.find(kit => kit.char === e.key);
    activeElement.active = false;
    this.setState({ drumKit: oldKit });
  }

  render() {
    const { drumKit } = this.state;
    return (
      <div className="drum-machine-container">
        {
          drumKit &&
          drumKit.map(kit =>
            <KeyPressButton
              key={kit.char}
              char={kit.char}
              description={kit.description}
              active={kit.active}
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