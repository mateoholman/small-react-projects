import React from 'react';
import { storiesOf } from '@storybook/react';
import TodoList from './index.jsx';
import AdvancedTodoList from './AdvancedTodo.jsx';

storiesOf('Todo List', module)
  .add('default', () => <TodoList />)
  .add('Advanced', () => <AdvancedTodoList />);