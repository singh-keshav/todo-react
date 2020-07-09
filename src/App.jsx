import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SignUp from "./components/signup";
import SignIn from "./components/sign-in";
import User from "./user";
import TestingPage from "./testing-page";
import Profile from "./profile";
import AuthService from "./services/auth-services";

const currentUser = AuthService.getCurrentUser();

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={SignUp} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/testingpage" component={TestingPage} />
        <Route exact path="/profile" component={Profile} />
      </Router>
    );
  }
}

export default App;
