
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
import React, { Component, Children } from "react";
import { Tooltip, OverlayTrigger, ControlLabel } from "react-bootstrap";
//import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Messages from "components/Tasks/Messages.jsx";
import { ToastContainer, toast } from 'react-toastify';
//import { Dropdown, Container } from 'semantic-ui-react'
//import fillList from "components/Tasks/fillList.jsx";
// import { Container, Header, List } from "semantic-ui-react";





export class All_units2 extends Component {

  
  //***********CONSTRUCTOR */
  constructor(props){
    //alert("-----");
    super(props);
    this.state={
      items:[],
      isLoaded:false,
      itemsf:[],
      alarms:[],
      clickalarm:false,
      typesAlarms: [],
      Uclick:-1,
      id:[],
      checkdisable:false,
      buttonupdate:"btn btn-primary",
    
      
    }
    
  }

  //**********HANDLE EVENTS */

  componentDidMount(){
    this.getFacilities();
    //this.getData();    
    
    this.getTypes();
  }

  handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    //console.log(stringifyFormData(data));
    
    const api_call = await fetch('https://homedots.us/beddot/public/unitSave', {
      method: 'POST',
      body: data,
    });
  
    const data2 = await api_call;

    //console.log(data2);

  }

  handleCheckedDashboard = async(e) => {
    e.preventDefault();
    console.log("HERE")
    var valor = e.target.value;
    var aux = e.target.id;
    console.log(document.getElementById(aux).checked + " " + aux + " value "+valor )
    if(document.getElementById(aux).checked==true)
    {
      document.getElementById(aux).checked=false;
      console.log("entro en ponerlo en false")
    }
    else{
      document.getElementById(aux).checked=true;
      console.log("entro en ponerlo en true")
    }


  }


  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
    //console.log("entro")

  };

  handleDrop = event => {
    this.setState({
      isLoaded:true,
      items:[],        
    })
    var id_facility=document.querySelector('#Select1').value;  
    fetch('https://homedots.us/beddot/public/getUnitClientFacility/'+id_facility)
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        items:json.result,        
      })      
      //console.log(this.state);
    })
  };

  handleStatus = async(e) =>{
    e.preventDefault();
    var valor = e.target.value;
    var aux = e.target.id;
    aux = aux.substring(8);
    var vector=this.state.items[aux];
    var idU = vector['idUnit'];
    const data = new FormData();
    data.append('idUnit',idU);            
    data.append('status',valor);
    //console.log(stringifyFormData(data))
    await fetch('https://homedots.us/beddot/public/changeStatus', {
      method: 'POST',
      body: data,
    });
    
    //update checkbox
    console.log(valor)
    if(valor=='Activated'){      
      document.getElementById(aux).disabled=false;
      
    }
    else{
      document.getElementById(aux).disabled=true;
      document.getElementById(aux).checked=false;
        
    }
    
    toast.success("Status Updated")
     
    
  }
  
   //**********FUNCTIONS */

  saveData = async(e) =>{
    e.preventDefault();
   
    const data = new FormData(document.getElementById("requestForm"));
    console.log(stringifyFormData(data))

    //console.log(stringifyFormData(data));
    toast.info("Wait while the dashboard is created.")
    
    
    await fetch('https://homedots.us/beddot/public/unitSave', {
      method: 'POST',
      body: data,
    });
    toast.success("Dashboard created")


  }

  updatealarms = async(e) =>{
    console.log("Updating alarm")
     e.preventDefault();
     const target = e.target;
     var num;
     num= target.id;
     const fid = num.substring(7)
     
     var vector=this.state.items[fid];
     var idU = vector['idUnit'];     
     const data = new FormData();
     
     data.append('idUnit',idU) 
     var name="";
     for(var i=0;i<this.state.typesAlarms.length;i++){
        name = document.getElementsByName("alarm"+i)[0].name;
        var pos_idA = name.substring(5);
        var idA = this.state.typesAlarms[pos_idA]["idAlarmType"];    
        data.append("idAlarm"+i,idA)
        if(document.getElementsByName("alarm"+i)[0].checked) 
            data.append("status"+i,1)
        else
            data.append("status"+i,0)

     }
     //console.log(stringifyFormData(data));
     //call endpoint
     await fetch('https://homedots.us/beddot/public/updateAlarms', {
      method: 'POST',
      body: data,
    });
    toast.success("Successful Alarm Update")

  }

  getAlarms = async(e) =>{
    // console.log(document.getElementById('ButtonAlarm0').value)
     e.preventDefault();
     const target = e.target;
     var num;
     num= target.id;
     const fid = num.substring(11)
     var vector=this.state.items[fid];
     var idU = vector['idUnit'];
     //console.log("HEREEEEE===="+idU)
     await fetch('https://homedots.us/beddot/public/getAlarms/'+idU)
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        alarms:json.result,   
        unitalarm:idU,    
        clickalarm:true,
        Uclick:fid
      })      
      //console.log(this.state.alarms);
    })
     
   
  }

  getTypes = async() =>{   
    await fetch('https://homedots.us/beddot/public/getTypesAlarm')
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        typesAlarms:json.result,        
      })            
    })
  }

  updateclient = async(e) =>{
      e.preventDefault();
      const target = e.target;
      var num=target.id;
      const fid = num.substring(7)
      var data=this.state.items[fid];
      var idU = data['idUnit'];
      var idC = data['idClient'];
      var id_facility=document.querySelector('#Select1').value; 
     
      if(document.getElementById("password"+fid).value !== document.getElementById("repeatpassword"+fid).value){
        toast.error("Error: Passwords must match."); 
        
      }
      else{
          if(document.getElementById("unit"+fid).value==''  ||
            document.getElementById("client"+fid).value==''   ||
            document.getElementById("phone"+fid).value==''     ||
            document.getElementById("email"+fid).value==''      ||
            document.getElementById("ssid"+fid).value==''   ||
            document.getElementById("password"+fid).value==''){
              toast.error("Error: All required fields must be filled."); 
          }
          else{
            const data = new FormData();
            data.append('idFacility',id_facility)            
            data.append('idUnit',idU);
            data.append('mac',document.getElementById("mac"+fid).value);
            data.append('nameUnit',document.getElementById("unit"+fid).value);
            data.append('idClient',idC);
            data.append('nameClient',document.getElementById("client"+fid).value);
            data.append('phone',document.getElementById("phone"+fid).value);
            data.append('email',document.getElementById("email"+fid).value);
            data.append('ssid',document.getElementById("ssid"+fid).value);
            data.append('password',document.getElementById("password"+fid).value);
            data.append('status',document.getElementById("selValue"+fid).value);
            data.append('visible',document.getElementById(fid).checked)
            console.log(stringifyFormData(data));

            await fetch('https://homedots.us/beddot/public/shortUnitSave', {
              method: 'POST',
              body: data,
            });
            console.log("Update Here")
            this.setState({
              buttonupdate : "hidden"
            })
            //this.getData();
            //this.getFacilities();
            var id_facility=document.querySelector('#Select1').value;
            await fetch('https://homedots.us/beddot/public/getUnitClientFacility/'+id_facility)
            .then(res=>res.json())
            .then(json=>{
              this.setState({
                isLoaded:true,
                items:json.result,        
              })      
              //console.log(this.state);
            })
            document.querySelector('#Select1').value=id_facility;            
            toast.success("Unit Updated")

          }
     }

  } 

 
 SelectChangedHandler = (event) => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.value
    });
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
      
     // console.log(this.state);
    })

  }

  getFacilities = async() => {
    await fetch('https://homedots.us/beddot/public/getFacilities')
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        itemsf:json.result,    
      })      
    })
    var id_facility=document.querySelector('#Select1').value;  
    fetch('https://homedots.us/beddot/public/getUnitClientFacility/'+id_facility)
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        items:json.result,        
      })      
      //console.log(this.state);
    })
    var x = document.querySelector('#Select1').value;
    this.setState({
      id:x
    })
    console.log(x)
  }

  clean = async(e) =>{
      this.setState({
        buttonupdate : "btn btn-primary"
      })
  }

  render() {
    var { isLoaded , items, typesAlarms} = this.state;
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
    const disabledcheck = [];
    const disabledinput = [];

    //****Variable for Types of Alarms */
    const idTypeAlarm = [];
    const nameAlarm = [];
    
  
    if(!isLoaded){
      return <div>Loading...</div>;
    }
    else{
         //alert(items[0]["idUnit"]);
      if(items){         
         for(var i=0 ; i < items.length ; i++){
          units_title[i]  = items[i]["mac"];
          units_Name[i]   = items[i]["unitName"];         
          if(units_Name[i]=="")
            units_Name[i] = "NO ASSIGNED"
          client_Name[i]  = items[i]["nameClient"];
          if(client_Name[i]=="")
            client_Name[i] = "NO ASSIGNED"
          client_Phone[i] = items[i]["phoneClient"];
          client_Email[i] = items[i]["mailClient"];
          client_ssid[i]  = items[i]["ssid"];
          client_pass[i]  = items[i]["password"];
          client_id[i]    = items[i]["idClient"];
          status_s[i]     = items[i]["status"];
          visible[i]      = items[i]["visible"]; 
          if(status_s[i]=="1"){
              status_s[i]     = "Activated";
              disabledcheck[i] = false;
          }
          else{
              status_s[i]     = "Deactivated"
              disabledcheck[i] = true;
          }
          if(visible[i] == 0){
            dash_s[i] = false;
            disabledinput[i] = false;
          }
          else{
            dash_s[i] = true;
            disabledinput[i] = true;
          }
         }
        }
      if(typesAlarms){
        for(var i=0 ; i < typesAlarms.length ; i++){
          idTypeAlarm[i]  = typesAlarms[i]["idAlarmType"];
          nameAlarm[i]    = typesAlarms[i]["nameAlarm"];
        }
      }
    }
    
    const edit1 = <Tooltip id="edit_tooltip">Edit</Tooltip>;
    const edit2 = <Tooltip id="conf_tooltip">Configure Alarms</Tooltip>;
    //const dash1 = <Tooltip id="dash_button">To include in dashboard</Tooltip>;
    
    //**********Fill the modal of Alarms configuration */
    var fillModalAlarms = [];
    var checkfill_id = [];
    var checkfill_type = [];
    var checkfill_status = [];
    var checkfill_email = [];
    var check_checkbox = false;
    if(this.state.clickalarm){
        for(var j=0;j<this.state.alarms.length;j++){
            checkfill_id[j]   =   this.state.alarms[j]["idAlarm"];
            checkfill_type[j] =   this.state.alarms[j]["idAlarmType"];
            checkfill_status[j] = this.state.alarms[j]["status"];
            checkfill_email[j]  = this.state.alarms[j]["email"];
            //console.log(checkfill_id[j]+" "+checkfill_type[j]+" "+checkfill_status[j]+" "+checkfill_email[j])
        }        
        for(var i=0;i<this.state.typesAlarms.length;i++){
            
            if(this.state.alarms.length==0)
                check_checkbox=false;
            else{                
                for(var j=0;j<this.state.alarms.length;j++){
                  if(idTypeAlarm[i] == checkfill_type[j]){
                    if(checkfill_status[j] == 1){
                        check_checkbox=true;
                    }
                    else
                        check_checkbox=false;
                  }
                }
            }       
            fillModalAlarms.push(     
                          
                <div id={"divalarm"+i} key={"divalarm"+i}>
                  <table  id={'table'+i} key={'table'+i}>
                    <tbody id={'tbody'+i} key={'tbody'+i}>
                      <tr id={'tralarm'+i} key={'tralarm'+i}>
                         <td id={'tdalarm'+i} key={'tdalarm'+i}>
                            <Checkbox
                              id={i+10000}
                              key={idTypeAlarm[i]}
                              name={"alarm"+i}
                              number={i+10000}
                              isChecked={check_checkbox}
                              //onChange={this.handleCheckbox}
                            />
                         </td >
                         <td id={'tdalarm2'+i} key={'tdalarm2'+i}>
                            <label id={'label'+i} key={'label'+i} defaultValue={idTypeAlarm[i]}>{nameAlarm[i]}</label>
                         </td>
                      </tr>                      
                    </tbody>
                  </table>                  
                </div>                
              
            ) 
            
        }             
    }

    
    //******Insert all the units in the render */
    var message = [];
    var num=1;
    var units = [];
    var element=0;
    var fillcorrectt = [];
    
    for (num = 0; num < units_title.length; num++) {
      if(num==this.state.Uclick){
         fillcorrectt = fillModalAlarms;
      }
      else{
        fillcorrectt = [];
      }
      if(this.state.id!=""){
        units.push(
          <tr key={num}> 
                          <td>
                              <Checkbox
                                id={num}
                                key={'check'+num}
                                name={'check'+num}
                                number={num}
                                isChecked={dash_s[num]}
                                disabled={disabledcheck[num]}
                                //onClick={this.handleCheckedDashboard}
                              />
                          </td>
                          
                          <td>{units_title[num]}<input id={'mac'+num} key={'mac'+num} name={'mac'+num} type="hidden" defaultValue={units_title[num]}></input></td>
                          <td>{units_Name[num]} <input id={'idClient'+num} key={'idClient'+num} name={'idClient'+num} type="hidden" defaultValue={client_id[num]}></input></td>
                          <td>{client_Name[num]}</td>
                          
                          <td>
                          {/* onChange={(event)=>this.SelectChangedHandler(event)} */}
                          {/* value={status_s[num]}  */}
                          <select name={"selValue"+num} key={"selValue"+num} id={"selValue"+num}  className="selectpicker" defaultValue={status_s[num]} onChange={this.handleStatus} >
                              
                              <option  value="Activated">Activated</option>
                              <option  value="Deactivated">Deactivated</option>
                              
                            </select>
                          </td>
                          <td>
                              <OverlayTrigger placement="top" overlay={edit1}>
                                  <Button id={"ButtonUpdate"+num} key={"ButtonUpdate"+num} name={"ButtonUpdate"+num} bsStyle="info" simple type="button" bsSize="xs" data-toggle="modal" data-target={"#exampleModalCenter"+num} onClick={this.clean} >
                                      <i className="fa fa-edit" />
                                  </Button>
                              </OverlayTrigger>
                              <OverlayTrigger placement="top" overlay={edit2}>
                                  <Button id={"ButtonAlarm"+num} key={"ButtonAlarm"+num} name={"ButtonAlarm"+num} bsStyle="info" simple type="button" bsSize="xs" data-toggle="modal" data-target={"#exampleModalAlert"+num} onClick={this.getAlarms} defaultValue={num}>
                                      <i id={'ButtonAlarm'+num} key={'ButtonAlarm'+num} name={'ButtonAlarm'+num} defaultValue={num} className="fa fa-bell" />
                                  </Button>
                              </OverlayTrigger>
                              {/* <Button id={"ButtonUpdate"+num} bsStyle="info" key={num} fill type="button" data-toggle="modal" data-target={"#exampleModalCenter"+num} >
                                  Update Client
                              </Button> */}
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
                                            <label>Unit Name *</label>
                                            <input id={'unit'+num} key={'unit'+num} name={'unit'+num}  className="form-control" defaultValue={units_Name[num]}></input>
                                            <label>Client Name *</label>
                                            <input id={'client'+num} key={'client'+num} name={'client'+num} className="form-control" defaultValue={client_Name[num]}></input>
                                            <label>Client Phone *</label>
                                            <input id={'phone'+num} key={'phone'+num} name={'phone'+num} type="phone" className="form-control" defaultValue={client_Phone[num]}></input>
                                            <label>Client Email *</label>
                                            <input id={'email'+num} key={'email'+num} name={'email'+num}  type="email" className="form-control" defaultValue={client_Email[num]}></input>
                                            <label>Client SSID (Wifi network) *</label>
                                            <input id={'ssid'+num} key={'ssid'+num} name={'ssid'+num}  type="text" className="form-control" defaultValue={client_ssid[num]}></input>
                                            <label>Client Password (Wifi network) *</label>
                                            <input id={'password'+num} key={'password'+num} name={'password'+num} type="password" className="form-control" defaultValue={client_pass[num]}></input>
                                            <label>Client Password (Wifi network) REPEAT *</label>
                                            <input id={'repeatpassword'+num} key={'repeatpassword'+num} name={'repeatpassword'+num} type="password" className="form-control" defaultValue={client_pass[num]}></input>
                                    </div>
                                    <div className="modal-footer">
                                    <Button id={'button'+num+'1'} bsStyle="info" key={'button'+num+'1'} fill type="button" className="btn btn-secondary" data-dismiss="modal" >
                                        Close
                                      </Button>
                                      <Button id={'buttonU'+num} bsStyle="info" key={'buttonU'+num} fill type="button" className={this.state.buttonupdate} onClick={this.updateclient} defaultValue={num} >
                                        Update
                                      </Button>                                  
                                    </div>
                                  </div>
                                </div>
                              </div>


                              
                              <div className="modal fade" id={"exampleModalAlert"+num} tabIndex="-1" role="dialog" aria-labelledby="exampleModalAlertTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                          <h5 className="modal-title" id="exampleModalAlertTitle">Unit {units_Name[num]} - Alarm Configuration</h5>
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                            {fillcorrectt}                                          
                                    </div>
                                    <div className="modal-footer">
                                    <Button id={'buttonClose'+num+'1'} bsStyle="info" key={'buttonClose'+num+'1'} fill type="button" className="btn btn-secondary" data-dismiss="modal" >
                                        Close
                                      </Button>
                                      <Button id={'buttonA'+num} bsStyle="info" key={'buttonA'+num} fill type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.updatealarms} defaultValue={num} >
                                        Update
                                      </Button>                                  
                                    </div>
                                  </div>
                                </div>
                              </div>
                              

                          </td>
                          
              </tr>
              
        )
        element=element+1
      }
    }

    //********** Adding facilities to the list */
    var { isLoaded , itemsf} = this.state;
    var adding = [];
    var total_facilities=itemsf.length;
    var id_facility = [];
    var name_facility = [];
    for(i=0;i<total_facilities;i++){
      id_facility[i]=itemsf[i]["id_facility"];
      name_facility[i]=itemsf[i]["name_facility"];
      adding.push(
      <option id={"drop"+i} key={"drop"+i} name={"drop"+i} value={id_facility[i]}>{name_facility[i]}</option>
      );
    }

    
    


    
    return(  
      
      <div>
        <form id="requestForm" onSubmit={this.handleSubmit}> 
        <table>
          <tbody>
            <tr>
            <td><ControlLabel style={{margin:20}}>Please select the facility</ControlLabel></td> 
              <td>
                  <select id="Select1" key="Select1" name="Select1" style={{ margin: 20 }} onChange={this.handleDrop}>
                  {adding}          
                  </select>
              </td>
              <td>
              <Button onClick={this.saveData} id="dashButton" bsStyle="info" key="dashButton" fill type="button">
                  Generate Dashboard
              </Button>
              </td>
          </tr>
          </tbody>
        </table>
      
      
    
 
      
      {/* <button>SAVE CHANGES AND GENERATE DASHBOARD</button> */}
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
                        <td>Status</td>
                        <td>Update</td>
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
      <div> <ToastContainer /> </div>
      </div>
    );
  }
}

export default All_units2;

function stringifyFormData(fd) {
  const data = {};
	for (let key of fd.keys()) {
  	data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}