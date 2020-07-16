import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Todo from "./containers/todos";
import Login from "./components/login";
import Signup from "./components/signup";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Signup} />
        <Route path="/todos" component={Todo} />
      </Router>
    );
  }
}

export default App;
