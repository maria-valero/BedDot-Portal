/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Switch , withRouter} from "react-router-dom";

export class StatsRoom extends Component {

  constructor(props){
    super(props);

    this.state = {
      id: props.statsRoomId
    }

    this.onClick = this.props.onClick;

  }

  updateRoom = async(e) => {
    
    if (typeof this.props.onClick === 'function') {
      this.onClick(e.target.value,0);
    }
  }
  updateRoom2 = async(e) => {
    
    if (typeof this.props.onClick === 'function') {
      this.onClick(e.target.value,-1);
    }
  }
  

  render() {
    return (
      <div className="card card-stats">
        <div className="content" >
          <Row>
            <Col xs={3}>
              <div className="icon-big text-center icon-warning">
                {this.props.bigIcon}
              </div>
            </Col>
            <Col xs={8}>
              <div >
                <p><strong>{this.props.statsValue}</strong></p>
              </div>
            </Col>
            <Col xs={8}>
              <div >
                <p><font size="2">{this.props.statsSsid}</font></p>
              </div>
            </Col>
          </Row>
          <div className="footer">
            <hr />
            <div className="stats">
            
              <Button id="buton1P" bsStyle="info" value={this.state.id} onClick={this.updateRoom}>Update</Button>
              <Button id="buton2P" bsStyle="info" value={this.state.id} style={{margin:5}} onClick={this.updateRoom2}>Delete Email/Phones</Button>
           
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsRoom ;
