import React from "react";
import axios from "axios";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "../PanelHeader.jsx";
import Sidebar from "../Sidebar/PatientSidebar";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import DashboardFooter from "../Footers/DashboardFooter";

let patientID = "";

class User extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        user: {}
      }
    }

    componentDidMount() {
      console.log("Props in Patient User Page: ", this.props);
      patientID = this.props.match.params.id;
      axios.get('http://localhost:4000/api/user/'+patientID)
        .then(res => {
          this.setState({ user: res.data });
          console.log("User state in Patient user page: " ,this.state.user);
      });
    }
      
  render() {
    return (
      <>
      <div className="wrapper">
        <Sidebar {...this.props} />
        <div className="main-panel" ref={this.mainPanel}>
          <DashboardNavbar {...this.props} />
            <PanelHeader size="sm" />
            <div className="content">
              <Row>
                <Col md="8">
                  <Card>
                    <CardHeader>
                      <h5 className="title">My Profile</h5>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <Row>
                          <Col className="pr-1" md="6">
                            <FormGroup>
                              <label>Account</label>
                              <Input
                                defaultValue="0x31F78757A4bAe84808Aa91a1cebf43e50ca0BFd6"
                                disabled
                                placeholder="Account"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-1" md="6">
                            <FormGroup>
                              <label htmlFor="exampleInputEmail1">
                                Email address
                              </label>
                              <Input defaultValue={this.state.user.email} type="email" disabled />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pr-1" md="6">
                            <FormGroup>
                              <label>First Name</label>
                              <Input
                                defaultValue={this.state.user.first_name}
                                type="text"
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-1" md="6">
                            <FormGroup>
                              <label>Last Name</label>
                              <Input
                                defaultValue={this.state.user.last_name}
                                placeholder="Last Name"
                                type="text"
                                disabled
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pr-1" md="6">
                            <FormGroup>
                              <label>Age</label>
                              <Input 
                                defaultValue={this.state.user.age} 
                                type="number" 
                                min="0"
                                max="120"
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-1" md="6">
                            <FormGroup>
                              <label>Blood Group</label>
                              <Input
                                defaultValue={this.state.user.blood_group}
                                type="text"
                                disabled
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-user">
                    <CardBody>
                      <Row>
                      <Col className="pl-1" md="6">
                        Documents Uploaded
                      </Col>
                      <Col className="pr-1" md="6">
                        23
                      </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          <DashboardFooter fluid />
        </div>
      </div>
      </>
    );
  }
}

export default User;