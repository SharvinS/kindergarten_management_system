import React, { Component } from "react";
import UserService from "../services/UserService";
import { storage } from "../firebase";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import documents from "../assets/documents.png";
import ReactHover from "react-hover";
import { Trigger, Hover } from "react-hover/dist/ReactHover";
import { Tabs, Tab, Row, Col, Container } from "react-bootstrap";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

class UpdateStudentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      userId: "",
      name: "",
      dateOfBirth: "",
      age: "",
      addressLine1: "",
      addressLine2: "",
      addressZip: "",
      addressCity: "",
      addressState: "",
      addressCountry: "",
      classroom: "",
      dateJoined: "",
      dateStopped: "",
      gender: "",
      foodIntake: "",
      experience: "",
      contact: "",
      illness: "",
      allergy: "",
      toiletEthics: "",
      studentEmergencyPersonName: "",
      studentEmergencyPersonNumber: "",
      fatherName: "",
      fatherAge: "",
      fatherPhoneNumber: "",
      fatherDateOfBirth: "",
      fatherOccupation: "",
      fatherEmployer: "",
      fatherOfficeNumber: "",
      motherName: "",
      motherAge: "",
      motherPhoneNumber: "",
      motherDateOfBirth: "",
      motherOccupation: "",
      motherEmployer: "",
      motherOfficeNumber: "",
      profilePicture: "",
      attachment: "",
      fileList: [],
      successful: false,
      message: "",
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      let user = res.data;
      this.setState({
        userId: user.userId,
        name: user.name,
        dateOfBirth: user.dateOfBirth,
        age: user.age,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        addressZip: user.addressZip,
        addressCity: user.addressCity,
        addressState: user.addressState,
        addressCountry: user.addressCountry,
        classroom: user.classroom,
        dateJoined: user.dateJoined,
        dateStopped: user.dateStopped,
        gender: user.gender,
        foodIntake: user.foodIntake,
        experience: user.experience,
        contact: user.contact,
        illness: user.illness,
        allergy: user.allergy,
        toiletEthics: user.toiletEthics,
        studentEmergencyPersonName: user.studentEmergencyPersonName,
        studentEmergencyPersonNumber: user.studentEmergencyPersonNumber,
        fatherName: user.fatherName,
        fatherAge: user.fatherAge,
        fatherPhoneNumber: user.fatherPhoneNumber,
        fatherDateOfBirth: user.fatherDateOfBirth,
        fatherOccupation: user.fatherOccupation,
        fatherEmployer: user.fatherEmployer,
        fatherOfficeNumber: user.fatherOfficeNumber,
        motherName: user.motherName,
        motherAge: user.motherAge,
        motherPhoneNumber: user.motherPhoneNumber,
        motherDateOfBirth: user.motherDateOfBirth,
        motherOccupation: user.motherOccupation,
        motherEmployer: user.motherEmployer,
        motherOfficeNumber: user.motherOfficeNumber,
        profilePicture: user.profilePicture,
        attachment: user.attachment,
      });
    });
  }

  updateStudent = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      let user = {
        userId: this.state.userId,
        name: this.state.name,
        dateOfBirth: this.state.dateOfBirth,
        age: this.state.age,
        addressLine1: this.state.addressLine1,
        addressLine2: this.state.addressLine2,
        addressZip: this.state.addressZip,
        addressCity: this.state.addressCity,
        addressState: this.state.addressState,
        addressCountry: this.state.addressCountry,
        classroom: this.state.classroom,
        dateJoined: this.state.dateJoined,
        dateStopped: this.state.dateStopped,
        gender: this.state.gender,
        foodIntake: this.state.foodIntake,
        experience: this.state.experience,
        contact: this.state.contact,
        illness: this.state.illness,
        allergy: this.state.allergy,
        toiletEthics: this.state.toiletEthics,
        studentEmergencyPersonName: this.state.studentEmergencyPersonName,
        studentEmergencyPersonNumber: this.state.studentEmergencyPersonNumber,
        fatherName: this.state.fatherName,
        fatherAge: this.state.fatherAge,
        fatherPhoneNumber: this.state.fatherPhoneNumber,
        fatherDateOfBirth: this.state.fatherDateOfBirth,
        fatherOccupation: this.state.fatherOccupation,
        fatherEmployer: this.state.fatherEmployer,
        fatherOfficeNumber: this.state.fatherOfficeNumber,
        motherName: this.state.motherName,
        motherAge: this.state.motherAge,
        motherPhoneNumber: this.state.motherPhoneNumber,
        motherDateOfBirth: this.state.motherDateOfBirth,
        motherOccupation: this.state.motherOccupation,
        motherEmployer: this.state.motherEmployer,
        motherOfficeNumber: this.state.motherOfficeNumber,
        profilePicture: this.state.profilePicture,
        attachment: this.state.attachment,
      };

      // console test view
      console.log("student => " + JSON.stringify(user));

      UserService.updateStudent(this.state.id, user).then(
        (res) => {
          this.setState({
            message: res.data.message,
            successful: true,
          });
          this.props.history.push("/principal/student-list");
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
  };

  changeUserIdHandler = (event) => {
    this.setState({ userId: event.target.value });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeDOBHandler = (event) => {
    this.setState({ dateOfBirth: event.target.value });
  };

  changeAgeHandler = (event) => {
    this.setState({ age: event.target.value });
  };

  changeAddressLine1Handler = (event) => {
    this.setState({ addressLine1: event.target.value });
  };

  changeAddressLine2Handler = (event) => {
    this.setState({ addressLine2: event.target.value });
  };

  changeAddressZipHandler = (event) => {
    this.setState({ addressZip: event.target.value });
  };

  changeAddressCityHandler = (event) => {
    this.setState({ addressCity: event.target.value });
  };

  changeAddressStateHandler = (value) => {
    this.setState({ addressState: value });
  };

  changeAddressCountryHandler = (value) => {
    this.setState({ addressCountry: value });
  };

  changeClassroomHandler = (event) => {
    this.setState({ classroom: event.target.value });
  };

  changeDateJoinedHandler = (event) => {
    this.setState({ dateJoined: event.target.value });
  };

  changeDateStoppedHandler = (event) => {
    this.setState({ dateStopped: event.target.value });
  };

  changeGenderHandler = (event) => {
    this.setState({ gender: event.target.value });
  };

  changeFoodIntakeHandler = (event) => {
    this.setState({ foodIntake: event.target.value });
  };

  changeExperienceHandler = (event) => {
    this.setState({ experience: event.target.value });
  };

  changeContactHandler = (event) => {
    this.setState({ contact: event.target.value });
  };

  changeIllnessHandler = (event) => {
    this.setState({ illness: event.target.value });
  };

  changeAllergyHandler = (event) => {
    this.setState({ allergy: event.target.value });
  };

  changeToiletEthicsHandler = (event) => {
    this.setState({ toiletEthics: event.target.value });
  };

  changeEmergencyNameHandler = (event) => {
    this.setState({ studentEmergencyPersonName: event.target.value });
  };

  changeEmergencyNumberHandler = (event) => {
    this.setState({ studentEmergencyPersonNumber: event.target.value });
  };

  changeFatherNameHandler = (event) => {
    this.setState({ fatherName: event.target.value });
  };

  changeFatherAgeHandler = (event) => {
    this.setState({ fatherAge: event.target.value });
  };

  changeFatherPhoneNumberHandler = (event) => {
    this.setState({ fatherPhoneNumber: event.target.value });
  };

  changeFatherDOBHandler = (event) => {
    this.setState({ fatherDateOfBirth: event.target.value });
  };

  changeFatherOccupationHandler = (event) => {
    this.setState({ fatherOccupation: event.target.value });
  };

  changeFatherEmployerHandler = (event) => {
    this.setState({ fatherEmployer: event.target.value });
  };

  changeFatherOfficeNumberHandler = (event) => {
    this.setState({ fatherOfficeNumber: event.target.value });
  };

  changeMotherNameHandler = (event) => {
    this.setState({ motherName: event.target.value });
  };

  changeMotherAgeHandler = (event) => {
    this.setState({ motherAge: event.target.value });
  };

  changeMotherPhoneNumberHandler = (event) => {
    this.setState({ motherPhoneNumber: event.target.value });
  };

  changeMotherDOBHandler = (event) => {
    this.setState({ motherDateOfBirth: event.target.value });
  };

  changeMotherOccupationHandler = (event) => {
    this.setState({ motherOccupation: event.target.value });
  };

  changeMotherEmployerHandler = (event) => {
    this.setState({ motherEmployer: event.target.value });
  };

  changeMotherOfficeNumberHandler = (event) => {
    this.setState({ motherOfficeNumber: event.target.value });
  };

  changeProfilePictureHandler = (event) => {
    this.setState({ profilePicture: event.target.value });
  };

  changeAttachmentHandler = (event) => {
    this.setState({ attachment: event.target.value });
  };

  cancel() {
    this.props.history.push("/principal/student-list");
  }

  getAttachment() {
    const filePreviewOption = {
      followCursor: false,
      shiftX: 20,
      shiftY: 0,
    };

    if (this.state.id === "add") {
      return;
    } else {
      if (!this.state.attachment) {
        return;
      } else {
        const downloadLink = [];
        for (const [index, value] of this.state.attachment
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

  render() {

    const { addressCountry, addressState } = this.state;

    const uploadImage = (e) => {
      const image = e.target.files[0];
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function ....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        (error) => {
          // error function ....
          console.log(error);
        },
        () => {
          // complete function ....
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              this.setState({ profilePicture: url });
            });
        }
      );
    };

    const uploadAttachment = (e) => {
      if (this.state.userId === "") {
        alert("Wrong ID");
        return;
      } else {
        console.log("file length: ", e.target.files.length);

        for (let i = 0; i < e.target.files.length; i++) {
          const file = e.target.files[i];
          try {
            if (file.size > 5242880) {
              alert("File size is too big! Please choose another file.");
            } else {
              const storageRef = storage.ref(
                `attachments/` + this.state.userId
              );
              const fileRef = storageRef.child(file.name);

              fileRef.put(file).then(() => {
                console.log("Uploaded " + file.name + " successfully");
              });
            }
          } catch {
            return;
          }
        }
        try {
          setTimeout(() => {
            const storageRef = storage.ref(
              `attachments/` + this.state.userId
            );
            storageRef
              .listAll()
              .then((res) => {
                res.items.forEach((itemRef) => {
                  itemRef
                    .getDownloadURL()
                    .then((url) => {
                      var attachmentList = this.state.fileList.concat(url);
                      this.setState({ fileList: attachmentList });
                      this.setState({
                        attachment: this.state.fileList.join(","),
                      });
                      console.log(this.state.fileList);
                      console.log(this.state.attachment);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                });
              })
              .catch(function (error) {
                console.log(error);
              });
          });
        } catch {
          return;
        }
      }
    };

    return (
      <div className="container">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
          <h2 className="text">Student Update Form</h2>
        </div>
        <div className="row gutters" style={{ marginTop: "20px" }}>
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body text-center">
                <div className="view-account">
                  <div className="view">
                    <div className="form-group"></div>
                    <h5 className="name">
                      {this.state.name}'s Profile
                      Picture
                    </h5>

                    <div className="image">
                      <img
                        src={
                          this.state.profilePicture ||
                          "http://via.placeholder.com/150x150"
                        }
                        alt="Profile_Picture"
                        height="150"
                        width="150"
                        className=" rounded-circle mx-auto d-block"
                      />
                      <br />
                      <input type="file" onChange={uploadImage} />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <Form
                onSubmit={this.updateStudent}
                ref={(c) => {
                  this.form = c;
                }}
              >
                {!this.state.successful && (
                  <div>
                    <div className="card-body">
                      <Container>
                        <Row>
                          <Col>
                            <Tabs defaultActiveKey="personalDetails" id="controlled-tab-example">
                              <Tab eventKey="personalDetails" title="Personal Details">
                                <div className="row gutters">

                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}>
                                    <label>Name:</label>
                                    <input
                                      placeholder="Name"
                                      name="name"
                                      className="form-control"
                                      value={this.state.name}
                                      onChange={this.changeNameHandler}
                                      maxLength="110"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <div className="row" style={{ marginLeft: "0px" }}>
                                      <label>Gender:</label>
                                    </div>
                                    <div className="row" style={{ marginLeft: "0px" }}>
                                      <select
                                        value={this.state.gender} onChange={this.changeGenderHandler} style={{ width: 350, height: 37 }}>
                                        <option classroom="---">---</option>
                                        <option gender="Male">Male</option>
                                        <option gender="Female">Female</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}>
                                    <label>User ID:</label>
                                    <input
                                      placeholder="User ID"
                                      name="userId"
                                      className="form-control"
                                      value={this.state.userId}
                                      onChange={this.changeUserIdHandler}
                                      maxLength="10"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <div className="row" style={{ marginLeft: "0px" }}>
                                      <label>Classroom:</label>
                                    </div>
                                    <div className="row" style={{ marginLeft: "0px" }}>
                                      <select
                                        value={this.state.classroom} onChange={this.changeClassroomHandler} style={{ width: 350, height: 37 }}>
                                        <option classroom="---">---</option>
                                        <option classroom="K1">K1</option>
                                        <option classroom="K2">K2</option>
                                        <option classroom="K3">K3</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Date of Birth:</label>
                                    <input
                                      type="date"
                                      placeholder="dd/mm/yyyy"
                                      name="dateofbirth"
                                      className="form-control"
                                      value={this.state.dateOfBirth}
                                      onChange={this.changeDOBHandler}
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Age:</label>
                                    <input
                                      type="number"
                                      placeholder="Age"
                                      name="age"
                                      className="form-control"
                                      value={this.state.age}
                                      onChange={this.changeAgeHandler}
                                      maxLength="2"
                                      min="0"
                                      max="99"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Join Date:</label>
                                    <input
                                      type="date"
                                      placeholder="Join Date"
                                      name="joinedDate"
                                      className="form-control"
                                      value={this.state.dateJoined}
                                      onChange={this.changeDateJoinedHandler}
                                      maxLength="30"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Stop Date:</label>
                                    <input
                                      type="date"
                                      placeholder="Stop Date"
                                      name="stoppedDate"
                                      className="form-control"
                                      value={this.state.dateStopped}
                                      onChange={this.changeDateStoppedHandler}
                                      maxLength="30"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Contact:</label>
                                    <input
                                      placeholder="Contact"
                                      name="contact"
                                      className="form-control"
                                      value={this.state.contact}
                                      onChange={this.changeContactHandler}
                                      maxLength="20"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Experience:</label>
                                    <input
                                      type="number"
                                      placeholder="Experience"
                                      name="experience"
                                      className="form-control"
                                      value={this.state.experience}
                                      onChange={this.changeExperienceHandler}
                                      maxLength="2"
                                      min="0"
                                      max="99"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Illness:</label>
                                    <input
                                      placeholder="Illness"
                                      name="illness"
                                      className="form-control"
                                      value={this.state.illness}
                                      onChange={this.changeIllnessHandler}
                                      maxLength="100"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Allergy:</label>
                                    <input
                                      placeholder="Allergy"
                                      name="allergy"
                                      className="form-control"
                                      value={this.state.allergy}
                                      onChange={this.changeAllergyHandler}
                                      maxLength="100"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <div className="row" style={{ marginLeft: "0px" }}>
                                      <label>Food Intake:</label>
                                    </div>
                                    <div className="row" style={{ marginLeft: "0px" }}>
                                      <select
                                        value={this.state.foodIntake} onChange={this.changeFoodIntakeHandler} style={{ width: 350, height: 37 }}>
                                        <option classroom="---">---</option>
                                        <option foodIntake="Good">Good</option>
                                        <option foodIntake="Average">Average</option>
                                        <option foodIntake="Poor">Poor</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <div className="row" style={{ marginLeft: "0px" }}>
                                      <label>Toilet Ethics:</label>
                                    </div>
                                    <div className="row" style={{ marginLeft: "0px" }}>
                                      <select
                                        value={this.state.toiletEthics} onChange={this.changeToiletEthicsHandler} style={{ width: 350, height: 37 }}>
                                        <option classroom="---">---</option>
                                        <option toiletEthics="Good">Good</option>
                                        <option toiletEthics="Average">Average</option>
                                        <option toiletEthics="Poor (Require diapers)">Poor (Require diapers)</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Emergency Contact Name:</label>
                                    <input
                                      placeholder="Emergency Contact Name"
                                      name="emergencyContactName"
                                      className="form-control"
                                      value={this.state.studentEmergencyPersonName}
                                      onChange={this.changeEmergencyNameHandler}
                                      maxLength="110"
                                    />
                                  </div>
                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Emergency Contact Number:</label>
                                    <input
                                      placeholder="Emergency Contact Number"
                                      name="emergencyContactNumber"
                                      className="form-control"
                                      value={this.state.studentEmergencyPersonNumber}
                                      onChange={this.changeEmergencyNumberHandler}
                                      maxLength="20"
                                    />
                                  </div>

                                </div>

                                <div
                                  className="form-group"
                                  style={{ marginTop: "15px" }}
                                >
                                  <label>Address Line 1:</label>
                                  <input
                                    placeholder="Address Line 1"
                                    name="addressLine1"
                                    className="form-control"
                                    value={this.state.addressLine1}
                                    onChange={this.changeAddressLine1Handler}
                                    maxLength="80"
                                  />
                                </div>

                                <div
                                  className="form-group"
                                  style={{ marginTop: "15px" }}
                                >
                                  <label>Address Line 2:</label>
                                  <input
                                    placeholder="Address Line 2"
                                    name="addressLine2"
                                    className="form-control"
                                    value={this.state.addressLine2}
                                    onChange={this.changeAddressLine2Handler}
                                    maxLength="80"
                                  />
                                </div>

                                <div className="row gutters">
                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <label>Zip:</label>
                                    <input
                                      placeholder="Zip"
                                      name="addressZip"
                                      className="form-control"
                                      value={this.state.addressZip}
                                      onChange={this.changeAddressZipHandler}
                                      maxLength="10"
                                    />
                                  </div>

                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <label>City:</label>
                                    <input
                                      placeholder="City"
                                      name="addressCity"
                                      className="form-control"
                                      value={this.state.addressCity}
                                      onChange={this.changeAddressCityHandler}
                                      maxLength="50"
                                    />
                                  </div>

                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}>
                                    <label>Country:</label>
                                    <CountryDropdown
                                      placeholder="Country"
                                      name="addressCountry"
                                      className="form-control"
                                      value={addressCountry}
                                      onChange={(value) => this.changeAddressCountryHandler(value)}
                                      maxLength="50"
                                    />
                                  </div>

                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}>
                                    <label>State:</label>
                                    <RegionDropdown
                                      placeholder="State"
                                      name="addressState"
                                      className="form-control"
                                      country={addressCountry}
                                      value={addressState}
                                      onChange={(value) => this.changeAddressStateHandler(value)}
                                      maxLength="50"
                                    />
                                  </div>

                                </div>

                              </Tab>

                              <Tab eventKey="fatherDetails" title="Father Details">
                                <div className="row gutters">

                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}>
                                    <label>Father Name:</label>
                                    <input
                                      placeholder="Father Name"
                                      name="fatherName"
                                      className="form-control"
                                      value={this.state.fatherName}
                                      onChange={this.changeFatherNameHandler}
                                      maxLength="110"
                                    />
                                  </div>

                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}>
                                    <label>Father Phone Number:</label>
                                    <input
                                      placeholder="Father Contact"
                                      name="fatherContact"
                                      className="form-control"
                                      value={this.state.fatherPhoneNumber}
                                      onChange={this.changeFatherPhoneNumberHandler}
                                      maxLength="20"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Father Age:</label>
                                    <input
                                      type="number"
                                      placeholder="Father Age"
                                      name="fatherAge"
                                      className="form-control"
                                      value={this.state.fatherAge}
                                      onChange={this.changeFatherAgeHandler}
                                      maxLength="3"
                                      min="0"
                                      max="99"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Father Date Of Birth:</label>
                                    <input
                                      type="date"
                                      placeholder="dd/mm/yyyy"
                                      name="fatherDateOfBirth"
                                      className="form-control"
                                      value={this.state.fatherDateOfBirth}
                                      onChange={this.changeFatherDOBHandler}
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Father Occupation:</label>
                                    <input
                                      placeholder="Father Occupation"
                                      name="fatherOccupation"
                                      className="form-control"
                                      value={this.state.fatherOccupation}
                                      onChange={this.changeFatherOccupationHandler}
                                      maxLength="50"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Father Office Number:</label>
                                    <input
                                      placeholder="Father Office Number"
                                      name="fatherOfficeNumber"
                                      className="form-control"
                                      value={this.state.fatherOfficeNumber}
                                      onChange={this.changeFatherOfficeNumberHandler}
                                      maxLength="20"
                                    />
                                  </div>

                                </div>

                                <div
                                  className="form-group"
                                  style={{ marginTop: "15px" }}
                                >
                                  <label>Father Employer:</label>
                                  <input
                                    placeholder="Father Employer"
                                    name="fatherEmployer"
                                    className="form-control"
                                    value={this.state.fatherEmployer}
                                    onChange={this.changeFatherEmployerHandler}
                                    maxLength="80"
                                  />
                                </div>

                              </Tab>

                              <Tab eventKey="motherDetails" title="Mother Details">
                                <div className="row gutters">

                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}>
                                    <label>Mother Name:</label>
                                    <input
                                      placeholder="Mother Name"
                                      name="motherName"
                                      className="form-control"
                                      value={this.state.motherName}
                                      onChange={this.changeMotherNameHandler}
                                      maxLength="110"
                                    />
                                  </div>

                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}>
                                    <label>Mother Phone Number:</label>
                                    <input
                                      placeholder="Mother Contact"
                                      name="motherContact"
                                      className="form-control"
                                      value={this.state.motherPhoneNumber}
                                      onChange={this.changeMotherPhoneNumberHandler}
                                      maxLength="20"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Mother Age:</label>
                                    <input
                                      type="number"
                                      placeholder="Mother Age"
                                      name="motherAge"
                                      className="form-control"
                                      value={this.state.motherAge}
                                      onChange={this.changeMotherAgeHandler}
                                      maxLength="3"
                                      min="0"
                                      max="99"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Mother Date Of Birth:</label>
                                    <input
                                      type="date"
                                      placeholder="dd/mm/yyyy"
                                      name="motherDateOfBirth"
                                      className="form-control"
                                      value={this.state.motherDateOfBirth}
                                      onChange={this.changeMotherDOBHandler}
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Mother Occupation:</label>
                                    <input
                                      placeholder="Mother Occupation"
                                      name="motherOccupation"
                                      className="form-control"
                                      value={this.state.motherOccupation}
                                      onChange={this.changeMotherOccupationHandler}
                                      maxLength="50"
                                    />
                                  </div>

                                  <div
                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                    style={{ marginTop: "15px" }}
                                  >
                                    <label>Mother Office Number:</label>
                                    <input
                                      placeholder="Mother Office Number"
                                      name="motherOfficeNumber"
                                      className="form-control"
                                      value={this.state.motherOfficeNumber}
                                      onChange={this.changeMotherOfficeNumberHandler}
                                      maxLength="20"
                                    />
                                  </div>

                                </div>

                                <div
                                  className="form-group"
                                  style={{ marginTop: "15px" }}
                                >
                                  <label>Mother Employer:</label>
                                  <input
                                    placeholder="Mother Employer"
                                    name="motherEmployer"
                                    className="form-control"
                                    value={this.state.motherEmployer}
                                    onChange={this.changeMotherEmployerHandler}
                                    maxLength="80"
                                  />
                                </div>

                              </Tab>
                              <Tab eventKey="attachments" title="Materials">
                                <div className="text-center" style={{ marginTop: "15px" }}>
                                  <div className="image">
                                    <img
                                      src={documents}
                                      alt="Profile_Attachment"
                                      height="150"
                                      width="150"
                                      className=" rounded-circle mx-auto d-block"
                                    />
                                    <br />
                                    <input type="file" onChange={uploadAttachment} />
                                    {/* <button onClick={this.handleUpload}>Upload</button> */}
                                    <br /> <br />

                                    <div className="card-header">List of Files</div>
                                    {this.getAttachment()}
                                  </div>
                                </div>
                              </Tab>
                            </Tabs>
                          </Col>
                        </Row>
                      </Container>





                      <div className="row gutters">
                        <div
                          className="row justify-content-md-center"
                          style={{ marginTop: "20px" }}
                        >
                          <div className="col text-center"></div>
                          <button
                            className="btn btn-success"
                            onClick={this.updateStudent}
                          >
                            Save Changes
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={this.cancel.bind(this)}
                            style={{ marginLeft: "10px" }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
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
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateStudentComponent;
