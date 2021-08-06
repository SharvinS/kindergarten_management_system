import React, { Component } from "react";
import UserService from "../services/UserService";

class ForgotPasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  changeEmailHandler = (e) => {
    this.setState({ email: e.target.value });
  };

  sendEmail = (e) => {
    e.preventDefault();

    let email = this.state.email;
    UserService.forgotPassword(email);

    alert("We have sent a reset password link to your email. Please check.");
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
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>
            <div>
              <p>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your e-mail"
                  required
                  autoFocus
                  value={this.state.email}
                  onChange={this.changeEmailHandler}
                  maxLength="50"
                />
              </p>
              <p className="text-center">
                <button className="btn btn-success" onClick={this.sendEmail}>
                  Send
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ForgotPasswordComponent;
