import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList} from './components/todo'
import {addTodo, generatedId } from './lib/todoHelpers';


class App extends Component {

  state = {
    todos: [
      {id:1, name: 'Learn React', isComplete: true},
      {id:2, name: 'Build an Awesome App!', isComplete: false},
      {id:3, name: 'Ship it!', isComplete: false}
    ],
    currentTodo: ''
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
        <TodoList todos={this.state.todos} />
      </div>        
      </div>
    );
  }
}

export default App;
