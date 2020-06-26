import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";

import CreateTodo from "./components/create-todo.component";
import TodosList from "./components/todos-list.component";
import EditTodo from "./components/edit-todo.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              <img
                src={logo}
                width="30"
                height="30"
                alt="CodingTheSmartWay.com"
              />
            </Link>
            <Link to="/" className="navbar-brand">
              MERN-Stack Todo App
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Todos
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">
                    Create Todo
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/create" component={CreateTodo} />
          <Route exact path="/" component={TodosList}/>
          <Route path="/edit/:id/" component={EditTodo}/>
        </div>
      </Router>
    );
  }
}

export default App;
