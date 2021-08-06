import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {this.state.userReady ? (
          <div>
            <div className="jumbotron" style={{marginTop:"60px"}}>
              <div className="row justify-content-center" style={{ marginTop: "-20px" }}>
                <homeH1>Glad to see you again</homeH1>
              </div>
              <h3>
                <strong>{currentUser.username}</strong>
              </h3>

              <div>
                <strong>Email:</strong> {currentUser.email}
              </div>

              <div className="foot-lnk">
                <a href="/change_password">Change Password</a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
