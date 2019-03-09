import React from 'react';
import { storiesOf } from '@storybook/react';
import KeyPressButton from './index';

storiesOf('KeyPressButton', module)
  .add('Standard', () => <KeyPressButton char="a" description="kick" />);