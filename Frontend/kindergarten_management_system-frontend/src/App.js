import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import graduation_cap from "./assets/graduation_cap.png";

import AuthService from "./services/AuthService";
import HomeComponent from "./components/HomeComponent";
import FooterComponent from "./components/FooterComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import ProfileComponent from "./components/ProfileComponent";
import BoardStudentComponent from "./components/BoardStudentComponent";
import BoardPrincipalComponent from "./components/BoardPrincipalComponent";
import UpdateStudentComponent from "./components/UpdateStudentComponent";
import ViewUserComponent from "./components/ViewUserComponent";
import UserUpdateComponent from "./components/UserUpdateComponent";
import ViewDeletedUser from "./components/ViewDeletedUser";
import ForgotPasswordComponent from "./components/ForgotPasswordComponent";
import ResetPasswordComponent from "./components/ResetPasswordComponent";
import ChangePasswordComponent from "./components/ChangePasswordComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showStudentBoard: false,
      showPrincipalBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showStudentBoard: user.roles.includes("ROLE_STUDENT"),
        showPrincipalBoard: user.roles.includes("ROLE_PRINCIPAL"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const {
      currentUser,
      showStudentBoard,
      showPrincipalBoard,
    } = this.state;

    return (
      <div className="main-app-container">
        <Router>
          <nav className="navbar navbar-expand navbar-dark">
            <Link to={"/home"} className="navbar-brand">
              <img src={graduation_cap} width="30" height="30" alt="" style={{marginLeft: "15px"}} />
              <span> </span>
              {/*<strong>Kindergarten Management System</strong>*/}
            </Link>

            <div className="navbar-nav ml-auto">
              {showPrincipalBoard && (
                <div>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/view-deleted-user"} className="nav-link">
                      Bin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/principal/student-list"} className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                </div>
              )}

              {showStudentBoard && (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                </div>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {/*{currentUser.username}*/} <i className="fa fa-user"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    {/*Log Out*/} <i className="fa fa-sign-out"></i>
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    {/*Login*/} <i className="fa fa-sign-in"></i>
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={HomeComponent} />
              <Route exact path="/login" component={LoginComponent} />
              <Route exact path="/register" component={RegisterComponent} />
              <Route exact path="/profile" component={ProfileComponent} />
              <Route path="/user" component={BoardStudentComponent} />
              <Route path="/principal/student-list" component={BoardPrincipalComponent}></Route>
              <Route path="/user-update/:id" component={UserUpdateComponent}></Route>
              <Route path="/view-user/:id" component={ViewUserComponent} ></Route>
              <Route path="/update-student/:id" component={UpdateStudentComponent}></Route>
              <Route path="/view-deleted-user" component={ViewDeletedUser}></Route>
              <Route path="/forgot_password" component={ForgotPasswordComponent}></Route>
              <Route path="/reset_password/:token" component={ResetPasswordComponent}></Route>
              <Route path="/change_password" component={ChangePasswordComponent}></Route>
            </Switch>
          </div>
          <FooterComponent />
        </Router>
      </div>
    );
  }
}

export default App;
