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

export class UnitsToApprove extends Component {
  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };
  render() {
    const approve = <Tooltip id="edit_tooltip">Approve</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;
    const units_title = [
      "3e:4f:5a:ef:d3:56",
      "1e:12:0e:0f:45:f4",
      "34:78:12:ef:74:ef"
    ];
    var tasks = [];
    var number;
    for (var i = 0; i < units_title.length; i++) {
      //number = "checkbox" + i;
      tasks.push(
        <tr key={i}>
          <td>{units_title[i]}</td>
          <td className="td-actions text-right">
            <OverlayTrigger placement="top" overlay={approve}>
              <Button bsStyle="info" simple type="button" bsSize="s">
                <i className="fa fa-check" />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={remove}>
              <Button bsStyle="danger" simple type="button" bsSize="s">
                <i className="fa fa-times" />
              </Button>
            </OverlayTrigger>
          </td>
        </tr>
      );
    }
    return <tbody>{tasks}</tbody>;
  }
}

export default UnitsToApprove;
