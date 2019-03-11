import React from 'react';
import { storiesOf } from '@storybook/react';
import DrumMachine from './index';

const kit1 = [
  {
    char: 'a',
    description: 'kick'
  },
  {
    char: 's',
    description: 'snare'
  },
  {
    char: 'd',
    description: 'clap'
  },
  {
    char: 'f',
    description: 'hi-hat'
  }
];

storiesOf('DrumMachine', module)
  .add('Default', () => <DrumMachine drumKit={kit1} />);