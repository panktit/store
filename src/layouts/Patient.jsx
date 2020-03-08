import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import DashboardNavbar from "../components/Navbars/DashboardNavbar.jsx";
import DashboardFooter from "../components/Footers/DashboardFooter.jsx";
import Sidebar from "../components/Sidebar/PatientSidebar.jsx";
import Upload from "../views/profile-sections/Upload.jsx";
import RecordList from "../views/profile-sections/PatientTableList.jsx";
import UserPage from "../views/profile-sections/PatientUserpage.jsx";

var ps;

let patient = {};

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  mainPanel = React.createRef();
  componentDidMount() {
    console.log("Props in Patient Layout did mount: ", this.props.location.state);
    patient = this.props.location.state;
    console.log("patient in Patient Layout did mount: ", patient);
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  render() {
    
    return (
      <div className="wrapper">
        <Sidebar {...this.props} />
        <div className="main-panel" ref={this.mainPanel}>
          <DashboardNavbar {...this.props} />
          <Switch>
            {/* {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })} */}
            {/* <Route path="/patient/profile/:id" component={UserPage} /> */}
            {/* <Route path={'/patient/view/'+patient._id} component={RecordList} />
            <Route path={'/patient/upload/'+patient._id} component={Upload} /> */}
            <Route path="/patient/profile" render={props => <UserPage {...props} />} />
            <Route path="/patient/view" render={props => <RecordList {...props} />} />
            <Route path="/patient/upload" render={props => <Upload {...props} />} /> 
            <Redirect from="/patient" to="patient/profile" />
          </Switch>
          <DashboardFooter fluid />
        </div>
      </div>
    );
  }
}

export default Dashboard;