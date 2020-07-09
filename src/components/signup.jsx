import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import AuthService from "../services/auth-services"

import SignIn from "./sign-in";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }
  handleClick() {
    this.setState();
  }

  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Todo Description: ${this.state.first_name}`);
    console.log(`Todo Responsible: ${this.state.last_name}`);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };

    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(
      this.state.first_name,
      this.state.last_name,
      this.state.email,
      this.state.password
    ).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    return (
      <Router>
        <Route exact path="/">
          <form
            onSubmit={this.onSubmit}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 50,
              maxWidth: 300
            }}
          >
            <h4>Welcome!</h4>
            <div className="form-group" style={{ marginTop: 20 }}>
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.first_name}
                onChange={this.onChangeFirstName}
              />
            </div>
            <div className="form-group">
              <label>last Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.last_name}
                onChange={this.onChangeLastName}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Register"
                className="btn btn-primary"
              />
            </div>
            <div className="container signin">
              Already have an account?
              <Link
                to="/users/login"
                className=" signin "
                onClick={this.handleClick.bind(this)}
              >
                sign in
              </Link>
            </div>
          </form>
        </Route>
        <Route path="/users/login" component={SignIn} />
      </Router>
    );
  }
}
