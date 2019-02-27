import React from 'react';
import { storiesOf } from '@storybook/react';
import TypeAhead from './index.jsx';

storiesOf('TypeAhead', module)
  .add('Downshift', () => <TypeAhead />);