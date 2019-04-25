import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import KeyPressButton from '../KeyPressButton';

require('./DrumMachine.scss');

const DrumMachine = (props) => {
  const [drumKit, setDrumKit] = useState(props.drumKit);
  const [drumKitKeys, setDrumKitKeys] = useState([]);

  useEffect(() => {
    window.addEventListener("keydown", props.handleKeyDown);
    // window.addEventListener("keyup", handleKeyUp.bind(this));
    return () => {
      window.removeEventListener("keydown", props.handleKeyDown);
      // window.removeEventListener("keyup", handleKeyUp.bind(this));
    }
  }, [props.drumKit]);

  useEffect(() => {
    setDrumKit(props.drumKit);
  }, [props.drumKit]);

  useEffect(() => {
    const dKeys = drumKit.map(kit => kit.char);
    console.info('dKeys setting: ', dKeys);
    if (drumKitKeys.length === 0) {
      setDrumKitKeys(dKeys);
    }
    console.info('dKeys after setting: ', drumKitKeys);
  }, [drumKitKeys]);

  // const handleKeyUp = (e) => {
  //   console.info('Keyup: ', e, e.key);
  //   if (drumKit.find(kit => kit.char === e.key)) {
  //     const oldKit = [...drumKit]
  //     const activeElement = oldKit.find(kit => kit.char === e.key);
  //     activeElement.active = false;
  //     setDrumKit(oldKit);
  //   }
  // }

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