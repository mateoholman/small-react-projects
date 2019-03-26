import React from 'react';
import { storiesOf } from '@storybook/react';
import TodoList from './index.jsx';

storiesOf('Todo List', module)
  .add('default', () => <TodoList />);