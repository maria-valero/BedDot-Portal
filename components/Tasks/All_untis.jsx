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
import { Tooltip } from "react-bootstrap";
//import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";





export class All_units extends Component {

  
  // handleSubmit(event) {
  //   event.preventDefault();
  //   const data = new FormData(event.target);

  //   console.log(stringifyFormData(data));
    
  //   fetch('https://homedots.us/beddot/public/unitSave', {
  //     method: 'POST',
  //     body: data,
  //   });

  // }
  constructor(props){
    //alert("-----");
    super(props);
    this.state={
      items:[],
      isLoaded:false,
    }
    
  }

  handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    console.log(stringifyFormData(data));
    
    const api_call = await fetch('https://homedots.us/beddot/public/unitSave', {
      method: 'POST',
      body: data,
    });
  

    const data2 = await api_call;

    console.log(data2);

  }



  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };
  

  saveData = async(e) =>{
    e.preventDefault();
    const data = new FormData(e.target);

    console.log(stringifyFormData(data));
    
    await fetch('https://homedots.us/beddot/public/unitSave', {
      method: 'POST',
      body: data,
    });

    // e.preventDefault();
    // var form = document.getElementById('requestForm');
    // console.log(form)
    // console.log("hola")
  }

 
 SelectChangedHandler = (event) => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.value
    });
  }

  componentDidMount(){
    this.getData();
  }


  getData = () => {
    fetch('https://homedots.us/beddot/public/getUnitClient')
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        items:json.result,
        //images:json.idClient,
      })
      //alert("ENTRA");
      //this.intervalID = setTimeout(this.getData.bind(this),5000);
      console.log(this.state);
    })

  }

  render() {
    var { isLoaded , items} = this.state;
    const units_title = [];
    const units_Name = [];
    const client_Name = [];
    const client_Phone = [];
    const client_Email= [];
    const client_ssid= [];
    const client_pass= [];
    const status_s = [];
    const dash_s = [];
    const client_id = [];
    const visible = [];

    if(!isLoaded){
      return <div>Loading...</div>;
    }
    else{
         //alert(items[0]["idUnit"]);

         for(var i=0 ; i < items.length ; i++){
          units_title[i]  = items[i]["mac"];
          units_Name[i]   = items[i]["unitName"];
          
          client_Name[i]  = items[i]["nameClient"];
          client_Phone[i] = items[i]["phoneClient"];
          client_Email[i] = items[i]["mailClient"];
          client_ssid[i]  = items[i]["ssid"];
          client_pass[i]  = items[i]["password"];
          client_id[i]    = items[i]["idClient"];
          status_s[i]     = items[i]["status"];
          visible[i]      = items[i]["visible"]; 
          if(status_s[i]=="1")
              status_s[i]     = "Activated";
          else
              status_s[i]     = "Deactivated"
          if(visible[i] == 0)
            dash_s[i] = false;
          else
            dash_s[i] = true;
         }
    }
    
    const edit1 = <Tooltip id="edit_tooltip">Edit</Tooltip>;
    const deactivate = <Tooltip id="remove_tooltip">Deactivate</Tooltip>;
    const dash1 = <Tooltip id="dash_button">To include in dashboard</Tooltip>;
    // const units_title = [
    //   "3e:4f:5a:ef:d3:56",
    //   "1e:12:0e:0f:45:f4",
    //   "34:78:12:ef:74:ef",
    //   "5e:5f:5d:ae:a1:3e",
    //   "78:79:e3:e4:12:12",
    //   "33:00:3e:fe:fa:24"
    // ];
    // const units_Name = [
    //   "BedDot1",
    //   "BedDot2",
    //   "NO ASSIGNED",
    //   "BedDot4",
    //   "NO ASIGNED",
    //   "BedDot5"
    // ];
    // const client_Name = [
    //   "Maria Valero",
    //   "Jose Clemente",
    //   "NO ASSIGNED",
    //   "WenZhan Song",
    //   "NO ASSIGNED",
    //   "Fangyu Li"
    // ];
    // const client_Phone = [
    //   "404-9351222",
    //   "404-9351466",
    //   "",
    //   "4044444444",
    //   "",
    //   "7705677890"
    // ];
    // const client_Email= [
    //   "maria@gmail.com",
    //   "jclementes@gmail.com",
    //   "",
    //   "wsong@uga.edu",
    //   "",
    //   "fangyu.li@uga.edu"

    // ];
    // const client_ssid= [
    //   "Comcast-1",
    //   "AT&T1",
    //   "",
    //   "WIFI123",
    //   "",
    //   "SERVICE123"      
    // ];
    // const client_pass= [
    //   "123",
    //   "12345",
    //   "",
    //   "Thisispass",
    //   "",
    //   "Anotherpass"
    // ];
    // const status_s = [
    //   "Activated",
    //   "Activated",
    //   "Deactivated",
    //   "Activated",
    //   "Deactivated",
    //   "Activated"

    // ];
    

    var num=1;

    var units = [];
    var element=0;
    for (var num = 0; num < units_title.length; num++) {
      units.push(
        <tr key={num}> 
                        <td>
                            <Checkbox
                              id={num}
                              key={'check'+num}
                              name={'check'+num}
                              number={num}
                              isChecked={dash_s[num]}
                            />
                        </td>
                        
                        <td>{units_title[num]}<input id={'mac'+num} key={'mac'+num} name={'mac'+num} type="hidden" defaultValue={units_title[num]}></input></td>
                        <td>{units_Name[num]} <input id={'idClient'+num} key={'idClient'+num} name={'idClient'+num} type="hidden" defaultValue={client_id[num]}></input></td>
                        <td>{client_Name[num]}</td>
                        <td>
                            <Button id={"ButtonUpdate"+num} bsStyle="info" key={num} fill type="button" data-toggle="modal" data-target={"#exampleModalCenter"+num} >
                                Update Client
                            </Button>
                            <div className="modal fade" id={"exampleModalCenter"+num} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                              <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Updating Client Information</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                          <label>Unit Name</label>
                                          <input id={'unit'+num} key={'unit'+num} name={'unit'+num}  className="form-control" defaultValue={units_Name[num]}></input>
                                          <label>Client Name</label>
                                          <input id={'client'+num} key={'client'+num} name={'client'+num} className="form-control" defaultValue={client_Name[num]}></input>
                                          <label>Client Phone</label>
                                          <input id={'phone'+num} key={'phone'+num} name={'phone'+num} type="phone" className="form-control" defaultValue={client_Phone[num]}></input>
                                          <label>Client Email</label>
                                          <input id={'email'+num} key={'email'+num} name={'email'+num}  type="email" className="form-control" defaultValue={client_Email[num]}></input>
                                          <label>Client SSID (Wifi network)</label>
                                          <input id={'ssid'+num} key={'ssid'+num} name={'ssid'+num}  type="text" className="form-control" defaultValue={client_ssid[num]}></input>
                                          <label>Client Password (Wifi network)</label>
                                          <input id={'password'+num} key={'password'+num} name={'password'+num} type="password" className="form-control" defaultValue={client_pass[num]}></input>
                                          <label>Client Password (Wifi network) REPEAT</label>
                                          <input id={'repeatpassword'+num} key={'repeatpassword'+num} name={'repeatpassword'+num} type="password" className="form-control" defaultValue={client_pass[num]}></input>
                                  </div>
                                  <div className="modal-footer">
                                  <Button id={'button'+num+'1'} bsStyle="info" key={'button'+num+'1'} fill type="button" className="btn btn-secondary" data-dismiss="modal" >
                                      Close
                                    </Button>
                                    <Button id={'button'+num+'2'} bsStyle="info" key={'button'+num+'2'} fill type="button" className="btn btn-primary" data-dismiss="modal" >
                                      Temporal Update
                                    </Button>                                  
                                  </div>
                                </div>
                              </div>
                            </div>
                        </td>
                        <td>
                        {/* onChange={(event)=>this.SelectChangedHandler(event)} */}
                        {/* value={status_s[num]}  */}
                        <select name={"selValue"+num} key={"selValue"+num} id={"selValue"+num}  className="selectpicker" defaultValue={status_s[num]} >
                            
                            <option  value="Activated">Activated</option>
                            <option  value="Deactivated">Deactivated</option>
                            
                          </select>
                        </td>
                        
            </tr>
            
      )
      element=element+1
    }

    
    
    return(      
      <form id="requestForm" onSubmit={this.handleSubmit}> 
      <div className="content"  >
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                //title="Approved Units"
                //category="Based on last picture"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                    <tr>                     
                        <td>Dashboard</td> 
                        <td>Mac Address</td>
                        <td>Unit Name</td>
                        <td>Client Name</td>
                        <td>Client Info</td>
                        <td>Status</td>
                        <td></td>
                      </tr>
                      
                    </thead>
                    <tbody>
                    {units}
                    </tbody>
                  </Table>
                }
              />
              <div>
              {/* <Button onClick={this.saveData} id="dashButton" bsStyle="info" key="dashButton" fill type="button" data-toggle="modal" data-target="#myModal"  >
                  Save and Generate Dashboard
              </Button> */}
              {/* <Button >CLICK</Button> */}
              <button>SAVE CHANGES AND GENERATE DASHBOARD</button>
              <div className="modal fade" id="myModal" role="dialog">
                  <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>                        
                      </div>
                      <div className="modal-body">
                        <p>Everything has been updated</p>
                      </div>
                      <div className="modal-footer">
                        <Button type="button" bsStyle="info" fill data-dismiss="modal">Close
                        </Button>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            
          </Row>
        </Grid>
      </div>
      </form>
    );
  }
}

export default All_units;

function stringifyFormData(fd) {
  const data = {};
	for (let key of fd.keys()) {
  	data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}