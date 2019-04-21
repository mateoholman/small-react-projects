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

storiesOf('DrumMachine', module)
  .add('Default', () => <DrumMachine drumKit={kit1} />);