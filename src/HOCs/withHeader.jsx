import React from "react";
import Context from "../store/context.js";
import "./styles/Header.css";

const withHeader = (WrappedComponent) => {
  class HeaderHOC extends React.Component {
    static contextType = Context;

    render() {

      const { data } = this.context;
      const logo = data ? data.companyLogo : "";
      const unitName = data ? data.unitName : "";

      return (
        <div className="header-wrapper">
          <div className="header">
            <img
              src={logo}
              alt="Company Logo"
              style={{ width: "auto", height: "100px" }}
            />
            <div>
              <h1>Feedback Survey</h1>
              <h4>{unitName}</h4>
            </div>
          </div>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  return HeaderHOC;
};

export default withHeader;
