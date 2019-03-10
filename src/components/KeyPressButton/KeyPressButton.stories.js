import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs,boolean } from '@storybook/addon-knobs';
import KeyPressButton from './index';

storiesOf('KeyPressButton', module)
.addDecorator(withKnobs)
.add('Default', () => <KeyPressButton char="s" description="hi-hat" active={boolean('Active', false)} />);