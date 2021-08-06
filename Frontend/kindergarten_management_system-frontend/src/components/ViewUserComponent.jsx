import React, { Component } from "react";
import UserService from "../services/UserService";
import ReactHover from "react-hover";
import { Trigger, Hover } from "react-hover/dist/ReactHover";

import { Tabs, Tab, Row, Col, Container } from "react-bootstrap";
import Modal from 'react-awesome-modal';


class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: [],
      ID: "",
      userReady: false,
      selectedFile: null,
      visible: false,
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data });
      this.editUser = this.editUser.bind(this);
    });
  }

  cancel() {
    this.props.history.push("/principal/student-list");
  }

  editUser(id) {
    this.props.history.push(`/update-student/${id}`);
  }

  getAttachment() {
    const filePreviewOption = {
      followCursor: false,
      shiftX: 20,
      shiftY: 0,
    };

    if (this.state.user.id === "add") {
      return;
    } else {
      if (!this.state.user.attachment) {
        return;
      } else {
        const downloadLink = [];
        for (const [index, value] of this.state.user.attachment
          .split(",")
          .entries()) {
          const initial = value
            .split(RegExp("%2..*%2F(.*?)alt"))[1]
            .split(".")[0];
          const fileName = initial.replaceAll("%20", " ");
          //downloadLink.push(<li key={index}><a href={value}>{fileName</a></li>)
          downloadLink.push(
            <ReactHover options={filePreviewOption}>
              <Trigger type="trigger">
                <ul className="list-group list-group-flush">
                  <li
                    className="list-group-item"
                    style={{ marginBottom: "5px" }}
                    key={index}
                  >
                    <i className="fa fa-download"></i>{" "}
                    <a href={value}>{fileName}</a>
                  </li>
                </ul>
              </Trigger>
              <Hover type="hover">
                <div>
                  <iframe
                    src={value}
                    title="File Preview"
                    style={{ width: "500px", height: "300px" }}
                  />
                </div>
              </Hover>
            </ReactHover>
          );
        }
        return downloadLink;
      }
    }
  }

  openPopUp() {
    this.setState({
      visible: true
    });
  }

  closePopUp() {
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <div
        className="container"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
          <h2 className="text">{this.state.user.name}'s Profile</h2>
        </div>
        <div className="row gutters" style={{ marginTop: "20px" }}>
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body text-center">
                <div className="view-account">
                  <div className="view">
                    <div className="image" style={{ padding: "10px" }}>
                      <img
                        src={
                          this.state.user.profilePicture ||
                          "http://via.placeholder.com/150x150"
                        }
                        alt="Profile_Picture"
                        height="150"
                        width="150"
                        className=" rounded-circle mx-auto d-block"
                      />
                    </div>
                    <h5 className="name">
                      {this.state.user.name}
                    </h5>
                    <p>
                      <small>{this.state.user.username}</small>
                    </p>
                    <p>
                      <small>{this.state.user.email}</small>
                    </p>

                    <div className="">
                      <hr />
                    </div>

                    <button class="btn btn-outline-info" onClick={() => this.openPopUp()}>Modification Details</button>
                    <Modal
                      visible={this.state.visible}
                      width="400"
                      height="150"
                      effect="fadeInUp"
                      onClickAway={() => this.closePopUp()}
                    >
                      <div>
                        <p style={{ marginTop: "20px" }}>
                          <small>Modified by: {this.state.user.lastModifiedBy}</small>
                        </p>
                        <p>
                          <small>Modified on: {this.state.user.lastModifiedDate}</small>
                        </p>
                        <button className="btn btn-outline-danger" onClick={() => this.closePopUp()}>Close</button>
                      </div>
                    </Modal>


                    {/*File Download 
                    <div className="text-center">
                      <br />
                      <a href={this.state.user.attachment}>
                        <button className="btn btn-outline-info">
                          <i className="fa fa-download"></i> Attachment
                        </button>
                      </a>
                    </div>
                    */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <Container>
                  <Row>
                    <Col>
                      <Tabs defaultActiveKey="personalDetails" id="controlled-tab-example">
                        <Tab eventKey="personalDetails" title="Personal Details">
                          <div className="row gutters">

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Name: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.name}</label>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Gender: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.gender}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>User ID: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.userId}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}
                            >
                              <label>Classroom: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.classroom}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}
                            >
                              <label>Date Of Birth: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.dateOfBirth}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}
                            >
                              <label>Age: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.age}</label>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Join Date: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.dateJoined}</label>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Stop Date: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.dateStopped}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Contact Number: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.contact}</label>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Experience: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.experience}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Illness: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.illness}</label>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Allergy: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.allergy}</label>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Food Intake: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.foodIntake}</label>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Toilet Ethics: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.toiletEthics}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Emergency Person Name: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.studentEmergencyPersonName}</label>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Emergency Person Number: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.studentEmergencyPersonNumber}</label>
                              </div>
                            </div>

                          </div>

                          <div
                            className="form-group"
                            style={{ marginTop: "15px" }}
                          >
                            <label>Address Line 1: </label>
                            <div className="form-control" id="disabledInput" rows="3">
                              <label>{this.state.user.addressLine1}</label>
                            </div>
                          </div>

                          <div
                            className="form-group"
                            style={{ marginTop: "15px" }}
                          >
                            <label>Address Line 2: </label>
                            <div className="form-control" id="disabledInput" rows="3">
                              <label>{this.state.user.addressLine2}</label>
                            </div>
                          </div>

                          <div className="row gutters">

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                              <label>Zip: </label>
                              <div className="form-control" id="disabledInput" rows="3">
                                <label>{this.state.user.addressZip}</label>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                              <label>City: </label>
                              <div className="form-control" id="disabledInput" rows="3">
                                <label>{this.state.user.addressCity}</label>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                              <label>State: </label>
                              <div className="form-control" id="disabledInput" rows="3">
                                <label>{this.state.user.addressState}</label>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                              <label>Country: </label>
                              <div className="form-control" id="disabledInput" rows="3">
                                <label>{this.state.user.addressCountry}</label>
                              </div>
                            </div>


                          </div>

                        </Tab>

                        <Tab eventKey="fatherDetails" title="Father Details">
                          <div className="row gutters">

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Father Name: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.fatherName}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Father Phone Number: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.fatherPhoneNumber}</label>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}
                            >
                              <label>Father Age: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.fatherAge}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}
                            >
                              <label>Father Date Of Birth: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.fatherDateOfBirth}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}
                            >
                              <label>Father Occupation: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.fatherOccupation}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}
                            >
                              <label>Father Office Number: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.fatherOfficeNumber}</label>
                              </div>
                            </div>

                          </div>

                          <div
                            className="form-group"
                            style={{ marginTop: "15px" }}
                          >
                            <label>Father Employer: </label>
                            <div className="form-control" id="disabledInput" >
                              <label>{this.state.user.fatherEmployer}</label>
                            </div>
                          </div>

                        </Tab>

                        <Tab eventKey="motherDetails" title="Mother Details">
                          <div className="row gutters">

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Mother Name: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.motherName}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}>
                              <label>Mother Phone Number: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.motherPhoneNumber}</label>
                              </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}
                            >
                              <label>Mother Age: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.motherAge}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}
                            >
                              <label>Mother Date Of Birth: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.motherDateOfBirth}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}
                            >
                              <label>Mother Occupation: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.motherOccupation}</label>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                              style={{ marginTop: "15px" }}
                            >
                              <label>Mother Office Number: </label>
                              <div className="form-control" id="disabledInput">
                                <label>{this.state.user.motherOfficeNumber}</label>
                              </div>
                            </div>

                          </div>

                          <div
                            className="form-group"
                            style={{ marginTop: "15px" }}
                          >
                            <label>Mother Employer: </label>
                            <div className="form-control" id="disabledInput">
                              <label>{this.state.user.motherEmployer}</label>
                            </div>
                          </div>

                        </Tab>
                        <Tab eventKey="attachments" title="Materials">
                          <div className="card-header">List of Files</div>
                          {this.getAttachment()}
                        </Tab>
                      </Tabs>
                    </Col>
                  </Row>
                </Container>

                <div className="row gutters" style={{ marginTop: "30px" }}>
                  <div className="row justify-content-md-center">
                    <div className="col text-center"></div>
                    <button
                      className="btn btn-info"
                      onClick={this.cancel.bind(this)}
                      style={{ marginTop: "20px" }}
                    >
                      Student List
                    </button>

                    <button
                      className="btn btn-success"
                      onClick={() => this.editUser(this.state.user.id)}
                      style={{ marginTop: "20px", marginLeft: "10px" }}
                    >
                      Update User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUserComponent;
