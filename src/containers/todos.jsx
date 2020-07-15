import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link, Route } from "react-router-dom";

import authService from "../services/auth";
import todoService from "../services/todo";

import logo from "../logo.svg";
import CreateTodo from "../components/create-todo.component";
import TodosList from "../components/todos-list.component";
import EditTodo from "../components/edit-todo.component";

class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authService.getCurrentUser(),
      todos: []
    };

    this.logoutHandler = this.logoutHandler.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.todoCreated=this.todoCreated.bind(this);
  }

  componentDidMount() {
    todoService
      .getAll()
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  logoutHandler() {
    authService.logout();
    this.setState({ currentUser: null });
  }

  updateTodo(todo) {
    this.setState({
      todos: this.state.todos.map(t => (t._id === todo._id ? todo : t))
    });
  }
  todoCreated(){
    todoService
      .getAll()
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  render() {
    const { currentUser } = this.state;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/todos/list" className="navbar-brand">
            <img src={logo} width="30" height="30" alt="" />
          </Link>
          <Link to="/todos/list" className="navbar-brand">
            {currentUser.first_name}
          </Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/todos/list" className="nav-link">
                  Todos
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/todos/create" className="nav-link">
                  Create Todo
                </Link>
              </li>
            </ul>
            <button
              className="float-right btn btn-primary"
              onClick={this.logoutHandler}
            >
              logout
            </button>
          </div>
        </nav>
        
        <Route path="/todos/create">
          <CreateTodo onCreate={this.todoCreated} />
        </Route>
        <Route path="/todos/list">
          <TodosList todos={this.state.todos} />
        </Route>
        <Route path="/todos/edit/:id">
          <EditTodo onEdit={this.updateTodo} />
        </Route>
      </div>
    );
  }
}

export default Todos;
