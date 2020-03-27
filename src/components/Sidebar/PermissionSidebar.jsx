/*eslint-disable*/
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "../../assets/img/tsmfavicon.png";

var ps;
let doctorId = "";
let patientId = "";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    console.log("Permission Sidebar props: ", this.props);
    patientId = this.props.match.params.id;
    doctorId = this.props.location.state.did;
    console.log("Doctor State Permission Sidebar props: ", doctorId);
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div className="sidebar" data-color="blue">
        <div className="logo">
          <a
            href="/"
            className="simple-text logo-mini"
            target="_blank"
          >
            <div className="logo-img">
              <img src={logo} alt="smartmed-logo" />
            </div>
          </a>
          <a
            href="/"
            className="simple-text logo-normal"
            target="_blank"
          >
            SmartMed
          </a>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
            <Nav>
                <li
                  className={
                    this.activeRoute("/permission/grant")}
                >
                  <NavLink {...this.props}
                    to ={{
                      pathname: `/permission/grant/`+patientId,
                      state: { 
                          did: doctorId, 
                      }
                  }}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="now-ui-icons objects_key-25" />
                    <p>Grant Permissions</p>
                  </NavLink>
                </li>

                {/* <li
                  className={
                    this.activeRoute("/patient/profile")}
                >
                  <NavLink {...this.props}
                    to={'/patient/profile/'+patientId}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="now-ui-icons arrows-1_minimal-left" />
                    <p>Back to My Profile</p>
                  </NavLink>
                </li> */}
            </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;