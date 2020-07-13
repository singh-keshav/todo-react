import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import authService from "../services/auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: "",
      isAuthorised: !!authService.getCurrentUser()
    };
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
    this.setState({
      loading: true,
      message: "something"
    });

    authService.login(this.state.email, this.state.password)
      .then(() => {
        this.setState({ isAuthorised: true });
      })
      .catch(error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      });
  }

  render() {
    if (this.state.isAuthorised) {
      return <Redirect to="/todos/list" />;
    }

    return (
      <div style={{ marginTop: 10 }}>
        <form
          onSubmit={this.onSubmit}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 150,
            maxWidth: 300
          }}
        >
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
            <input type="submit" value="Sign In" className="btn btn-primary" />
          </div>
          <div>
            Don't have an account? <Link to="/signup">Signup here.</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
