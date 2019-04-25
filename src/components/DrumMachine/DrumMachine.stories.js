import React from 'react';
import { storiesOf } from '@storybook/react';
import DrumMachine from './index';

const kit1 = [
  {
    char: 'h',
    description: 'kick'
  },
  {
    char: 'j',
    description: 'snare'
  },
  {
    char: 'k',
    description: 'clap'
  },
  {
    char: 'l',
    description: 'hi-hat'
  }
];

const handleKeyDown = (e) => {
  console.info('Key down: ', e.key);
  console.info('Keydown dkk: ', kit1);
  if (kit1.find(k => k.char === e.key)){
    const activeElement = kit1.find(kit => kit.char === e.key);
    activeElement.active = true;
  }
}

storiesOf('DrumMachine', module)
  .add('Default', () => <DrumMachine drumKit={kit1} handleKeyDown={handleKeyDown} />);