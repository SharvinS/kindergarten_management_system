import React, { Component } from "react";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import swal from "@sweetalert/with-react";

class ChangePasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      email: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
      user: [],
      userReady: false,
      successful: false,
      message: "",
    };
    this.oldPasswordHandler = this.oldPasswordHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.confirmPasswordHandler = this.confirmPasswordHandler.bind(this);
    this.savePassword = this.savePassword.bind(this);
  }

  componentDidMount() {

    localStorage.getItem("user");
    const currentUser = AuthService.getCurrentUser();

    this.setState({ currentUser: currentUser, userReady: true });

    UserService.getUserBoard(currentUser.id).then((res) => {
      this.setState({
        user: res.data,
      });
    });
    console.log(currentUser.email);
  }

  oldPasswordHandler = (e) => {
    this.setState({ oldPassword: e.target.value });
  };

  changePasswordHandler = (e) => {
    this.setState({ password: e.target.value });
  };

  confirmPasswordHandler = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  savePassword = (e) => {
    e.preventDefault();

    this.setState({
      oldPasswordError: "",
      passwordError: "",
      confirmPasswordError: "",
      problems: 0,
      successful: false,
      message: "",
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

    if (this.state.password === this.state.oldPassword) {
      window.scrollTo(0, 0);
      this.setState({
        passwordError: "New password must differ from your previous password",
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

    if (this.checkBtn.context._errors.length === 0) {
      UserService.checkPassword(
        this.state.user.email,
        this.state.oldPassword
      ).then(
        (response) => {
          this.setState({
            
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
      if (this.state.problems === 0) {
        UserService.changePassword(
          this.state.user.email,
          this.state.password
        ).then(
          (response) => {
            this.setState({
              //   message: response.data.message,
              //   successful: true,
            });
            swal(
              <div>
                <p>You have successfully changed your password</p>
              </div>
            );
            this.props.history.push(`/profile`);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              successful: false,
              message: resMessage,
            });
          }
        );
      }
    }
  };

  render() {
    return (
      <div>
        <div>
          <h2 className="text-center">Change Password</h2>
        </div>
        <Form
          style={{ width: "420px", margin: "0 auto" }}
          onSubmit={this.savePassword}
          ref={(c) => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div className="border border-secondary rounded p-3">
              <p>
                <input
                  type="password"
                  name="oldPassword"
                  className="form-control"
                  required
                  autoFocus
                  placeholder="Enter your old password"
                  value={this.state.oldPassword}
                  onChange={this.oldPasswordHandler}
                  maxLength="120"
                />
                <small id="passwordHelp" className="text-danger">
                  {this.state.message && (
                    <div className="form-group">
                      <div
                        className={
                          this.state.successful
                            ? "alert alert-success"
                            : "text-danger"
                        }
                        role="alert"
                      >
                        {this.state.message}
                      </div>
                    </div>
                  )}
                </small>
              </p>

              <p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  required
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
                <button className="btn btn-success">Save</button>
              </p>
            </div>
          )}
          
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
        </Form>
      </div>
    );
  }
}

export default ChangePasswordComponent;
