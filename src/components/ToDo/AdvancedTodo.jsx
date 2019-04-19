import React, { useState, useEffect, useRef } from "react";
import useTitle from "react-use/lib/useTitle";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";
import NewTodo from './NewTodo';

export default function AdvancedTodoList() {
  const [newTodo, updateNewTodo] = useState('');
  const todoId = useRef(0);
  const initialTodos = () => {
    const valueFromStorage = JSON.parse(window.localStorage.getItem("todos")) || [];
    todoId.current = valueFromStorage.reduce((memo, todo) => Math.max(memo, todo.id), 0);
    return valueFromStorage;
  }
  const [todos, updateTodos] = useState(initialTodos);
  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const inCompleteTodos = todos.reduce(
    (memo, todo) => (!todo.completed ? memo + 1 : memo),
    0
  );
  const title = inCompleteTodos ? `Todos (${inCompleteTodos})` : "Todos";
  useTitle(title);

  const handleNewChange = (e) => {
    updateNewTodo(e.target.value);
  }

  const handleNewSubmit = (e) => {
    e.preventDefault();
    todoId.current += 1;
    updateTodos(prevTodos => [
      ...prevTodos,
      { id: todoId.current, text: newTodo, completed: false }
    ]);
    updateNewTodo('');
  }

  const handleDelete = (id, e) => {
    updateTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }

  const handleCompletedToggle = (id, e) => {
    updateTodos(prevTodos => prevTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  return (
    <Container todos={todos}>
      <NewTodo
        onSubmit={handleNewSubmit}
        value={newTodo}
        onChange={handleNewChange}
      />
      {!!todos.length && (
        <List>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChange={handleCompletedToggle}
              onDelete={handleDelete}
            />
          ))}
        </List>
      )}
    </Container>
  );
}
