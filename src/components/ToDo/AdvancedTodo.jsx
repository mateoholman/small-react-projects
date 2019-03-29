import React, { Component } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";

export default class AdvancedTodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
    };
    this.handleNewChange = this.handleNewChange.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCompletedToggle = this.handleCompletedToggle.bind(this);
  }
  update(todos) {
    const inCompleteTodos = todos.reduce(
      (memo, todo) => (!todo.completed ? memo + 1 : memo),
      0
    );
    document.title = inCompleteTodos ? `Todos (${inCompleteTodos})` : "Todos";
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }
  componentDidMount() {
    const todos = JSON.parse(window.localStorage.getItem("todos") || "[]");
    this.update(todos);
    this.setState({ todos });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      this.update(this.state.todos);
    }
  }
  handleNewChange(e) {
    this.setState({
      newTodo: e.target.value
    });
  }
  handleNewSubmit(e) {
    e.preventDefault();
    this.setState(prevState => {
      return {
        todos: [
          ...prevState.todos,
          { id: Date.now(), text: prevState.newTodo, completed: false }
        ],
        newTodo: ""
      };
    });
  }
  handleDelete(id, e) {
    this.setState(prevState => {
      return {
        todos: prevState.todos.filter(todo => todo.id !== id)
      };
    });
  }
  handleCompletedToggle(id, e) {
    this.setState(prevState => {
      return {
        todos: prevState.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      };
    });
  }
  render() {
    const { newTodo, todos } = this.state;
    return (
      <Container todos={todos}>
        <NewTodo
          onSubmit={this.handleNewSubmit}
          value={newTodo}
          onChange={this.handleNewChange}
        />
        {!!todos.length && (
          <List>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onChange={this.handleCompletedToggle}
                onDelete={this.handleDelete}
              />
            ))}
          </List>
        )}
      </Container>
    );
  }
}
