import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList} from './components/todo'
import {addTodo, generatedId, findById, toggleTodo, updateTodo, removeTodo } from './lib/todoHelpers';
import {pipe, partial} from './lib/utils'

class App extends Component {

  state = {
    todos: [
      {id:1, name: 'Learn React', isComplete: true},
      {id:2, name: 'Build an Awesome App!', isComplete: false},
      {id:3, name: 'Ship it!', isComplete: false}
    ],
    currentTodo: ''
  }

  handleRemove = (id, e) => {
    e.preventDefault
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({todos: updatedTodos})
  }

  handleToggle = (id) => {
    /*  Code Without PIPE */
    // const todo = findById(id, this.state.todos)
    // const toggled = toggleTodo(todo)
    // const updatedTodos = updateTodo(this.state.todos, toggled)

    /* Code with PIPE */
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(id, this.state.todos)
    this.setState({todos: updatedTodos})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newId = generatedId()
    const newTodo = { id: newId, name: this.state.currentTodo, isComplete: false }
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
  }

  handleEmptySubmit = (e) => {
    e.preventDefault()
    this.setState({
      errorMessage: 'Please enter a todo item'
    })
  }

  handleInputChange = (e) => {
    this.setState({
      currentTodo: e.target.value
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React ToDos</h1>
        </header>
      <div className="Todo-App">
        {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
        <TodoForm 
          handleInputChange={this.handleInputChange} 
          currentTodo={this.state.currentTodo} 
          handleSubmit={submitHandler}
        />
        <TodoList 
          handleToggle={this.handleToggle} 
          todos={this.state.todos} 
          handleRemove={this.handleRemove} />
      </div>        
      </div>
    );
  }
}

export default App;
