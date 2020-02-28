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
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { thUnit } from "variables/Variables.jsx";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";

export class ApprovedUnits extends Component {
  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };
  render() {
    const edit1 = <Tooltip id="edit_tooltip">Edit</Tooltip>;
    const deactivate = <Tooltip id="remove_tooltip">Deactivate</Tooltip>;
    const units_title = [
      "3e:4f:5a:ef:d3:56",
      "1e:12:0e:0f:45:f4",
      "34:78:12:ef:74:ef"
    ];
    return(
      <div className="content" >
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Approved Units"
                //category="Based on last picture"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                    <tr> 
                        <td>Mac Address</td>
                        <td>Unit Name</td>
                        <td>Client Name</td>
                        <td>Action</td>
                      </tr>
                      
                    </thead>
                    <tbody>
                    <tr> 
                        <td>32:ef:4e:13:23:3e</td>
                        <td>BedDot1</td>
                        <td>Jose Clemente</td>
                        <td className="td-actions text-left">
                        <OverlayTrigger placement="top" overlay={edit1}>
                          <Button bsStyle="info" simple type="button" bsSize="xs">
                            <i className="fa fa-edit" />
                          </Button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={deactivate}>
                          <Button bsStyle="info" simple type="button" bsSize="xs">
                            <i className="fa fa-ban" />
                          </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr> 
                        <td>5e:3e:ef:2d:3a:12</td>
                        <td>BedDot2</td>
                        <td>Maria Valero</td>
                        <td className="td-actions text-left">
                        <OverlayTrigger placement="top" overlay={edit1}>
                          <Button bsStyle="info" simple type="button" bsSize="xs">
                            <i className="fa fa-edit" />
                          </Button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={deactivate}>
                          <Button bsStyle="info" simple type="button" bsSize="xs">
                            <i className="fa fa-ban" />
                          </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr> 
                        <td>5f:34:3a:5d:3e:12</td>
                        <td>BedDot3</td>
                        <td>WenZhan Song</td>
                        <td className="td-actions text-left">
                        <OverlayTrigger placement="top" overlay={edit1}>
                          <Button bsStyle="info" simple type="button" bsSize="xs">
                            <i className="fa fa-edit" />
                          </Button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={deactivate}>
                          <Button bsStyle="info" simple type="button" bsSize="xs">
                            <i className="fa fa-ban" />
                          </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr> 
                        <td>e1:12:34:5e:3f:df</td>
                        <td>BedDot4</td>
                        <td>Fangyu Li</td>
                        <td className="td-actions text-left">
                        <OverlayTrigger placement="top" overlay={edit1}>
                          <Button bsStyle="info" simple type="button" bsSize="xs">
                            <i className="fa fa-edit" />
                          </Button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={deactivate}>
                          <Button bsStyle="info" simple type="button" bsSize="xs">
                            <i className="fa fa-ban" />
                          </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      
                    </tbody>
                  </Table>
                }
              />
            </Col>

            
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ApprovedUnits;
