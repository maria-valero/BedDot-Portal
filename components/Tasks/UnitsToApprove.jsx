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
//import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
//import Alert from 'react-bootstrap/Alert';

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import $ from 'jquery';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';


//const decoratedOnClick = useAccordionToggle(eventKey, onClick);

//myFunction( $('.classSelector :first').attr('id') );


$(document).ready(function (FObject) {
  

  $("#ajaxSubmit > li").click(function (e){      
    var className = $('#clientfields').attr('class');
    console.log(className)
    
    var value = $(this).text()
    $( '#clientfields' ).empty();
    $('<label>Client Name</label>').appendTo('#clientfields');
    $('<input id="cn'+$(this).index()+'" class="form-control" placeholder="'+value+'" disabled="true"></input>').appendTo('#clientfields');
    $('<label>Client Phone</label>').appendTo('#clientfields');
    $('<input id="cpn'+$(this).index()+'" type="phone" class="form-control" placeholder="(000) 000-0000" disabled="true"></input>').appendTo('#clientfields');
    $('<label>Client Email</label>').appendTo('#clientfields');
    $('<input id="ce'+$(this).index()+'" type="email" class="form-control" placeholder="email@email.com" disabled="true"></input>').appendTo('#clientfields');
    $('<label>Client SSID</label>').appendTo('#clientfields');
    $('<input id="cssid'+$(this).index()+'" class="form-control" placeholder="USA_Wifi" disabled="true"></input>').appendTo('#clientfields');
   });

  

});



export class UnitsToApprove extends Component {

  
  

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
      var idvalue = "collapse" + i;
      var idclient = "collapse" + i;
      var numidvalue = "#"+idvalue;
      //number = "checkbox" + i;
      tasks.push(
        <tr key={i}>
          <td>{units_title[i]}</td>
          <td className="td-actions text-right">
            <OverlayTrigger placement="top" overlay={approve}>
              <Button bsStyle="info" simple type="button" bsSize="sm" data-toggle="collapse" data-target={numidvalue} aria-expanded="false" aria-controls={idvalue} >
                <i className="fa fa-check" />            
                </Button>
            </OverlayTrigger>            
            <div className="collapse" id={idvalue}>
              <div className="td-actions text-left"> 
                <Card
                  title="Edit Unit Information"
                  align="left"
                  content={
                      <form>
                        <FormInputs
                              ncols={["col-md-3", "col-md-3"]}
                                properties={[
                                  {
                                    label: "MAC Address",
                                    align: "ridsfsldfjkslkdfj",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "Company",
                                    defaultValue: units_title[i],
                                    disabled: true
                                  },
                                  {
                                    label: "Unit Name",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "",
                                    //defaultValue: "BedDot-"+units_title[i]
                                  }                       
                                ]}
                              />
                            <div className="dropdown">
                              <button className="btn btn-primary dropdown-toggle btn-toolbar" type="button" data-toggle="dropdown" >Assign Client
                                    <span className="caret"></span></button>
                              <div className="btn-group">                                                                                                
                                    <button type="button" className="btn btn-primary btn-toolbar" data-toggle="modal" data-target="#exampleModal">New Client</button>
                              </div>
                              <ul className="dropdown-menu" id="ajaxSubmit" >
                                <li ><a href="#">Maria Valero</a></li>
                                <li><a href="#">Jose Clemente</a></li>
                                <li><a href="#">WenZhan Song</a></li>
                                <li ><a href="#" >Fangyu Li</a></li>
                              </ul>
                            </div>
                            <div className={i} id="clientfields"></div>    
                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h4 className="modal-title" id="exampleModalLabel">Adding New Client</h4>
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                          <label>Client Name</label>
                                          <input className="form-control"></input>
                                          <label>Client Phone</label>
                                          <input type="phone" className="form-control"></input>
                                          <label>Client Email</label>
                                          <input type="email" className="form-control"></input>
                                          <label>Client SSID (Wifi network)</label>
                                          <input type="text" className="form-control"></input>
                                          <label>Client Password (Wifi network)</label>
                                          <input type="password" className="form-control"></input>
                                          <label>Client Password (Wifi network) REPEAT</label>
                                          <input type="password" className="form-control"></input>
                                    </div>
                                    <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                      <button type="button" className="btn btn-primary" data-dismiss="modal">Save changes</button>
                                    </div>
                                  </div>
                                </div>
                              </div>  
                              
                      </form> 
                      
                  }
                  
                  />
              </div>
              
            </div>
            <OverlayTrigger placement="top" overlay={remove}>
              <Button bsStyle="danger" simple type="button" bsSize="sm" data-toggle="modal" data-target="#denay">
                <i className="fa fa-times" />
              </Button>
            </OverlayTrigger>
            <form>
            <div className="modal fade" id="denay" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                        <h4>Are you sure you want to remove this unit?</h4>
                                    </div>
                                    <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                      <button type="button" className="btn btn-primary" data-dismiss="modal">Yes</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
            </form>
          </td>
        </tr>
        
      );
      
      
    }
    
    return <tbody>{tasks}</tbody>;
    
  }
  
}


export default UnitsToApprove;


