import React from 'react';
import { storiesOf } from '@storybook/react';
import LocalDT from './index.jsx';
import LocalDTMoment from './LocalDTMoment.jsx';

storiesOf('LocalDT', module)
    .add('default', () => <LocalDT />)
    .add('moment', () => <LocalDTMoment />)
    .add('moment countdown', () => <LocalDTMoment endTime="2020-01-01"/>);