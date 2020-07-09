import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import AuthService from "./services/auth-services";

import logo from "./logo.svg";
import CreateTodo from "./components/create-todo.component";
import TodosList from "./components/todos-list.component";
import EditTodo from "./components/edit-todo.component";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    AuthService.logout();
    this.setState({ currentUser: null });
  }

  render() {
    const { currentUser } = this.state;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/list" className="navbar-brand">
              <img src={logo} width="30" height="30" alt="" />
            </Link>
            <Link to="/list" className="navbar-brand">
              {currentUser.first_name}
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/list" className="nav-link">
                    Todos
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">
                    Create Todo
                  </Link>
                </li>
              </ul>
              <button className="float-right btn btn-primary" onClick={this.clickHandler}>logout</button>
            </div>
          </nav>
          <br />
          <Route path="/create" component={CreateTodo} />
          <Route path="/list" component={TodosList} />
          <Route path="/edit/:id/" component={EditTodo} />
        </div>
      </Router>
    );
  }
}
