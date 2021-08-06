import React, { Component } from "react";
import UserService from "../services/UserService";
import Table from "react-bootstrap/Table";

class ViewDeletedUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: [],
      ID: [],
    };
    this.restoreDeletedUser = this.restoreDeletedUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    UserService.getPrincipalBoard().then((res) => {
      this.setState({ user: res.data });
    });
  }

  restoreDeletedUser(id) {
    UserService.restoreDeletedUser(id).then((res) => {
      this.setState({
        user: this.state.user.filter((user) => user.id !== id),
      });
    });
  }

  deleteUser(id) {
    UserService.deleteUser(id).then((res) => {
      this.setState({
        user: this.state.user.filter((user) => user.id !== id),
      });
    });
  }

  cancel() {
    this.props.history.push("/principal/student-list");
  }

  render() {
    const filteredUsers = this.state.user.filter((deletedUser) => {
      return deletedUser.deleted === true;
    });

    return (
      <div>
        <h2 className="text-center">Deleted Users List</h2>
        <div className="d-flex flex-row">
          <div className="col-sm-8">
            <button
              className="btn btn-outline-secondary"
              onClick={this.cancel.bind(this)}
            >
              <i className="fa fa-chevron-left"></i> Students List
            </button>
          </div>
        </div>

        <Table responsive striped bordered hover size="sm">
          <thead className="">
            <tr>
              <th scope="col" className="text-center">
                User ID
              </th>
              <th scope="col" className="text-center">
                Name
              </th>
              <th scope="col" className="text-center">
                Username
              </th>
              <th scope="col" className="text-center">
                Stop Date
              </th>
              <th scope="col" className="text-center">
                Contact
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          {filteredUsers.map((user) => (
            <tbody>
              <tr key={user.id}>
                <td style={{ padding: "10px" }}>{user.userId}</td>
                <td style={{ padding: "10px" }}>{user.name}</td>
                <td style={{ padding: "10px" }}>{user.username}</td>
                <td style={{ padding: "10px" }}>{user.dateStopped}</td>
                <td style={{ padding: "10px" }}>{user.contact}</td>
                <td className="text-center">
                  <button
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                    className="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Restore User"
                    onClick={() => {
                      if (window.confirm("Restore the user?")) {
                        this.restoreDeletedUser(user.id);
                      }
                    }}
                  >
                    Restore
                  </button>
                  <button
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                    className="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete User"
                    onClick={() => {
                      if (window.confirm("Permanently delete the user?")) {
                        this.deleteUser(user.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    );
  }
}

export default ViewDeletedUser;
