import React from 'react';

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import PanelHeader from "../PanelHeader.jsx";
import Sidebar from "../Sidebar/RecordSidebar";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import DashboardFooter from "../Footers/DashboardFooter";
import axios from 'axios';
import Web3 from 'web3';
import Store from '../../abis/Store.json'
import { Button } from 'reactstrap';
var dateFormat = require('dateformat');

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
let file = "";
let count = "";
let patientId = "";
let doctorId="";

class Upload extends React.Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load patientId
    this.setState({patientId});
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log("User id: ", this.state.patientId);
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Store.networks[networkId]
    if(networkData) {
      const contract = web3.eth.Contract(Store.abi, networkData.address)
      this.setState({ contract })
      count = await this.state.contract.methods.getCount(this.state.patientId).call()
      this.setState({count})
      console.log("Count: ", this.state.count);
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    console.log("Props in doctor file upload: ",this.props);
    patientId = this.props.location.state.pid;
    doctorId= this.props.match.params.id;
    this.state = {
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      patientId: "",
      count: "",
      doctorId: "",
      doctorname: "",
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/user/'+doctorId)
      .then(res => {
        this.setState({ doctorname: res.data.first_name+' '+res.data.last_name })
        console.log("Username in Doctor upload: " ,this.state.doctorname);
    });
  }

  captureFile = (event) => {
    event.preventDefault()
    file = event.target.files[0]
    console.log("File Date: ", file.lastModifiedDate);
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    console.log("Submitting file to ipfs...")
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }
      this.state.contract.methods.set(this.state.patientId ,file.name, dateFormat() ,result[0].hash, this.state.doctorname).send({ from: this.state.account }).then((r) => {
        return this.setState({count});
      })
    })
    
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
                <Col md={12}>
                  <Card>
                    <CardHeader>
                      <h5 className="title">Upload a new record</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="container-fluid mt-5">
                        <div className="row">
                          <main role="main" className="col-lg-12 d-flex text-center">
                            <div className="content mr-auto ml-auto">
                              <form onSubmit={this.onSubmit} >
                                <input  type='file' onChange={this.captureFile} />
                                <Button type='submit' color='info' size='sm'> Submit </Button>
                              </form>
                              <p>&nbsp;</p>
                            </div>
                          </main>
                        </div>
                      </div>
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

export default Upload;