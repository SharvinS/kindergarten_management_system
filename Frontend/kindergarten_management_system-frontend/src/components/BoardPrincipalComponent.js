import React, { Component } from "react";
import UserService from "../services/UserService";

function searchingFor(ID) {
  return function (x) {
    return x.username !== null && x.username.includes(ID);
  };
}

class BoardPrincipalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      ID: [],
    };
    this.editUser = this.editUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.viewDeletedUser = this.viewDeletedUser.bind(this);
  }

  searchHandler(event) {
    this.setState({ ID: event.target.value });
  }

  clearFilter = (event) => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    this.setState({
      ID: event.target.value,
    });
  };

  componentDidMount() {
    UserService.getPrincipalBoard().then((res) => {
      this.setState({ user: res.data });
    });
  }

  addUser() {
    this.props.history.push("/add-user");
  }

  editUser(id) {
    this.props.history.push(`/update-student/${id}`);
  }

  removeUser(id) {
    UserService.removeUser(id).then((res) => {
      this.setState({
        user: this.state.user.filter((user) => user.id !== id),
      });
    });
  }

  viewUser(id) {
    this.props.history.push(`/view-user/${id}`);
  }

  viewDeletedUser() {
    this.props.history.push(`/view-deleted-user`);
  }

  render() {
    const filteredUsers = this.state.user.filter((deletedUser) => {
      return deletedUser.deleted === false;
    });

    return (
      <div>
        <h2 className="text-center">Students List</h2>
        <div className="d-flex flex-row" style={{ width: "350px", marginInlineStart: "375px", marginTop: "15px" }}>

          <input
            type="text"
            className="form-control"
            placeholder="Student Username"
            onChange={this.searchHandler}
          />
          <button
            className="btn btn-outline-secondary"
            onClick={this.clearFilter}
            style={{ marginLeft: "-39px" }}
          >
            <i className="fa fa-times"></i>
          </button>

          {/* 
          <div className="">
            <button
              className="btn btn-outline-secondary"
              onClick={this.viewDeletedUser}
            >
              View Deleted Users
            </button>
          </div>
          */}
        </div>

        <div className="row justify-content-center" style={{ marginTop: "15px" }}>
          {filteredUsers
            .filter(searchingFor(this.state.ID))
            .map((user) => (
              <div key={user.id}>
                <div className="col">
                  <div
                    className="card"
                    style={{ width: "15rem", height: "22rem" }}
                  >
                    <div className="align-items-center text-dark">
                      <img
                        className=" rounded-circle mx-auto d-block"
                        src={
                          user.profilePicture ||
                          "//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        }
                        width="90"
                        height="90"
                        alt=""
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title">
                          {user.name}
                        </h5>
                        <small className="">{user.email}</small>

                        <div className="">
                          <hr />
                        </div>

                        <div
                          className="row"
                          style={{ height: "25px", marginLeft: "1px" }}
                        >
                          <p className="text-muted">
                            <i className="fa fa-building"></i>
                            <span> </span>
                            {user.userId}
                          </p>
                        </div>
                        <div
                          className="row"
                          style={{ height: "25px", marginLeft: "1px" }}
                        >
                          <p className="text-muted">
                            <i className="fa fa-phone"></i>
                            <span> </span>
                            {user.studentEmergencyPersonNumber}
                          </p>
                        </div>

                        <div className="">
                          <hr />
                        </div>

                        <div className="row justify-content-center">
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.viewUser(user.id)}
                            className="btn btn-outline-primary"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="View Profile"
                          >
                            <i className="fa fa-eye"></i>
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.editUser(user.id)}
                            className="btn btn-outline-info"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Update Profile"
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            style={{
                              marginLeft: "10px",
                            }}
                            className="btn btn-outline-danger"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Remove User"
                            onClick={() => {
                              if (window.confirm("Remove the user?")) {
                                this.removeUser(user.id);
                              }
                            }}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default BoardPrincipalComponent;
