import React, { Component } from "react";
import UserService from "../services/UserService";
import saveTime from "../assets/saveTime.png";
import selfService from "../assets/selfService.png";
import onlineStudy from "../assets/onlineStudy.png";

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <div className=" jumbotron" style={{height:"420px", marginTop:"100px"}}>
          <div className="row justify-content-center"style={{ marginTop:"-20px"}}>
            <homeH1>WELCOME TO KINDERGARTEN MANAGEMENT SYSTEM</homeH1>
          </div>
          <div className="row" style={{marginTop:"30px"}}>
            <div className="row justify-content-center">
              <div style={{ width: "22rem" }}>
                <div className="align-items-center text-dark">
                  <img
                    src={saveTime}
                    className="rounded-circle mx-auto d-block"
                    width="130"
                    height="130"
                    alt=""
                  />
                  <div className="card-body text-center">
                    <p className="card-title">
                      <strong>Time Saver</strong>
                    </p>
                    <small>
                      Save substantial amount of time with our kindergarten management system
                    </small>
                  </div>
                </div>
              </div>

              <div style={{ width: "22rem", height: "23rem" }}>
                <div className="align-items-center text-dark">
                  <img
                    className=" rounded-circle mx-auto d-block"
                    src={onlineStudy}
                    width="130"
                    height="130"
                    alt=""
                  />
                  <div className="card-body text-center">
                    <p className="card-title">
                      <strong>Online Study Materials</strong>
                    </p>
                    <small>
                      Students may use study material uploaded to our kindergarten management system
                    </small>
                  </div>
                </div>
              </div>

              <div style={{ width: "22rem", height: "23rem" }}>
                <div className="align-items-center text-dark">
                  <img
                    className=" rounded-circle mx-auto d-block"
                    src={selfService}
                    width="130"
                    height="130"
                    alt=""
                  />
                  <div className="card-body text-center">
                    <p className="card-title">
                      <strong>User self-service</strong>
                    </p>
                    <small>
                      We allow our user update their details themselves to save more time for registration
                    </small>
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
