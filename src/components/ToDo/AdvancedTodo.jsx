import React, { useState } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";

export default function AdvancedTodoList() {
  const [newTodo, updateNewTodo] = useState('');
  const initialTodos = JSON.parse(window.localStorage.getItem("todos")) || [];
  const [todos, updateTodos] = useState(initialTodos);

  // update(todos) {
  //   const inCompleteTodos = todos.reduce(
  //     (memo, todo) => (!todo.completed ? memo + 1 : memo),
  //     0
  //   );
  //   document.title = inCompleteTodos ? `Todos (${inCompleteTodos})` : "Todos";
  //   window.localStorage.setItem("todos", JSON.stringify(todos));
  // }
  // componentDidMount() {
  //   const todos = JSON.parse(window.localStorage.getItem("todos") || "[]");
  //   this.update(todos);
  //   this.setState({ todos });
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.todos !== this.state.todos) {
  //     this.update(this.state.todos);
  //   }
  // }

  const handleNewChange = (e) => {
    updateNewTodo(e.target.value);
  }

  const handleNewSubmit = (e) => {
    e.preventDefault();
    updateTodos(prevTodos => [
      ...prevTodos,
      { id: Date.now(), text: newTodo, completed: false }
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
