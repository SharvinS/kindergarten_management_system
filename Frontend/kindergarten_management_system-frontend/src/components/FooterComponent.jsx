import React, { Component } from "react";

class FooterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <footer className="footer page-footer">
        <div className="container-fluid">
          <div className="row">
            <div className="footer-copyright mx-auto">
              <span className="text-muted">Copyright © 2021 Sharvin. All Rights Reserved</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterComponent;
