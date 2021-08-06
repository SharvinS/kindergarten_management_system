import React, { Component } from "react";
import UserService from "../services/UserService";

class ResetPasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.match.params.token,
      password: "",
      confirmPassword: "",
    };
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.confirmPasswordHandler = this.confirmPasswordHandler.bind(this);
    this.savePassword = this.savePassword.bind(this);
  }

  changePasswordHandler = (e) => {
    this.setState({ password: e.target.value });
  };

  confirmPasswordHandler = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  savePassword = (e) => {
    e.preventDefault();

    this.setState({
      passwordError: "",
      confirmPasswordError: "",
      problems: 0,
    });

    if (this.state.password === "") {
      window.scrollTo(0, 0);
      this.setState({
        passwordError: "Please enter a valid password",
        problems: 1,
      });
    }

    if (this.state.confirmPassword === "") {
      window.scrollTo(0, 0);
      this.setState({
        confirmPasswordError: "Please enter a valid password",
        problems: 1,
      });
    }

    if (this.state.password !== this.state.confirmPassword) {
      window.scrollTo(0, 0);
      this.setState({
        confirmPasswordError: "Password not match",
        problems: 1,
      });
    }

    if (this.state.password.length < 8) {
      window.scrollTo(0, 0);
      this.setState({
        passwordError: "Password length must be at least 8 characters",
        problems: 1,
      });
    }

    if (this.state.password.search(/[a-z]/i) < 0) {
      window.scrollTo(0, 0);
      this.setState({
        passwordError: "Your password must contain at least one letter",
        problems: 1,
      });
    }

    if (this.state.password.search(/[0-9]/) < 0) {
      window.scrollTo(0, 0);
      this.setState({
        passwordError: "Your password must contain at least one digit",
        problems: 1,
      });
    }

    if (this.state.password.search(/[?=.*[!@#$%^&*]/) < 0) {
      window.scrollTo(0, 0);
      this.setState({
        passwordError:
          "Your password must contain at least one special characters",
        problems: 1,
      });
    }

    console.log(this.state.problems);
    if (this.state.problems === 0) {
      let token = this.state.token;
      let password = this.state.password;
      UserService.resetPassword(token, password);
      alert("You have successfully changed your password.");
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div>
        <div>
          <h2 className="text-center">Forgot Password</h2>
        </div>

        <form style={{ width: "420px", margin: "0 auto" }}>
          <div className="border border-secondary rounded p-3">
            <div>
              <p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  required
                  autoFocus
                  placeholder="Enter your new password"
                  value={this.state.password}
                  onChange={this.changePasswordHandler}
                  maxLength="120"
                />
                <small id="passwordHelp" className="text-danger">
                  {this.state.passwordError}{" "}
                </small>
              </p>

              <p>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  required
                  placeholder="Confirm your new password"
                  value={this.state.confirmPassword}
                  onChange={this.confirmPasswordHandler}
                  maxLength="120"
                />
                <small id="passwordHelp" className="text-danger">
                  {this.state.confirmPasswordError}{" "}
                </small>
              </p>

              <p className="text-center">
                <button className="btn btn-success" onClick={this.savePassword}>
                  Save
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ResetPasswordComponent;
