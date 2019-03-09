import React from 'react';
import { storiesOf } from '@storybook/react';
import KeyPressButton from './index';

storiesOf('KeyPressButton', module)
  .add('Default', () => <KeyPressButton char="a" description="kick" />)
  .add('Active', () => <KeyPressButton char="s" description="hi-hat" active />);