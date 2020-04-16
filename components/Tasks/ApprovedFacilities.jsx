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
import { Tooltip, OverlayTrigger, ControlLabel } from "react-bootstrap";
//import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Messages from "components/Tasks/Messages.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class ApprovedFacilitties extends Component {


  //Constructor
  constructor(props){  
    super(props);
    this.state={
      items:[],
      isLoaded:false,
      show:false,
      id_to_show:-1,
      NoUnits:[],
      nrowifi:0,
      buttoadd:"btn btn-primary",
      nrowifi_edit:0,
      nrodelete:-1,
      
    }    
  }

  //******Functions for adding wifi */
  addWifi = async(e) => {
    var newnro = this.state.nrowifi + 1;
    this.setState({
      nrowifi : newnro
    })
   }
   
   addwifi2 = async(e) => {
    
    var newnro = this.state.nrowifi_edit + 1;
    this.setState({
      nrowifi_edit : newnro
    })
   }
   removeWifi = async(e) => {
    var newnro = this.state.nrowifi - 1;
    this.setState({
      nrowifi : newnro
    })
   }
   removeWifi_valid = async(e) => {
    var newnro = this.state.nrowifi_edit - 1;
    this.setState({
      nrowifi_edit : newnro
    })
  }
   cleanNewFacility = async(e) => {
    var newnro = 0;
    this.setState({
      nrowifi : newnro,
      buttoadd:"btn btn-primary",
    })
    
    document.getElementById("newfacility_name").value='';
    document.getElementById("newfacility_contact").value='';
    document.getElementById("newfacility_email").value='';
    document.getElementById("newfacility_dashboard").value='';
    document.getElementById("mainwifiSSDI").value='';
    document.getElementById("mainwifiPASS").value='';
   }

   handleFillWifi = async(e,n) => {
    
    this.setState({
      nrowifi_edit: 0
    })
  }

  setnrodelete = async(e) => {
    var id = e.target.id
    var data = id.split("-")
    //data[1]
    await this.setState({
      nrodelete:data[1],
    })
  }

  deletewifiDB = async(e) => {
    var idF = this.state.items[this.state.id_to_show]["id_facility"];                             //ID Facility
    var idW = this.state.items[this.state.id_to_show]["wifiID"][this.state.nrodelete];            //ID Wifi
    
    if(e.target.id=="buttondd"+this.state.id_to_show+"1"){
        const $ = window.$;
        $('#wifideletemodal'+this.state.id_to_show).modal('hide');
        
    }else{
      const $ = window.$;
        $('#wifideletemodal'+this.state.id_to_show).modal('hide');
        
        const data = new FormData();
        data.append('id_facility',idF)
        data.append('ifWifi',idW)
        console.log("Facility: "+idF)
        console.log("WifiID: "+idW)
        //console.log(stringifyFormData(data))
        await fetch('https://homedots.us/beddot/public/deleteWifi', {
          method: 'POST',
          body: data,
        })   
        this.getData();
        this.state = {
          show: true,          
        };    
        
        toast.success("Successful Modification")
        
    }
  }

  modifyWifi = async(e) => {
    var id = e.target.id
    var data1 = id.split("-")
   
    await this.setState({
      nrodelete:data1[1],
    })
    
    var idF = this.state.items[this.state.id_to_show]["id_facility"];                             //ID Facility
    var idW = this.state.items[this.state.id_to_show]["wifiID"][this.state.nrodelete];            //ID Wifi
    var ssidW = document.getElementById("inputwifissid-"+this.state.nrodelete+"-"+this.state.id_to_show).value;
    var passW = document.getElementById("inputwifipass-"+this.state.nrodelete+"-"+this.state.id_to_show).value;
    const data = new FormData();
    data.append('id_facility',idF)
    data.append('ifWifi',idW)
    data.append('ssid',ssidW)
    data.append('password',passW)    
      
    console.log(stringifyFormData(data))
    await fetch('https://homedots.us/beddot/public/updateWifi', {
          method: 'POST',
          body: data,
        })   
        this.getData();
        this.state = {
          show: true,          
        };   
      toast.success("The Wifi has been updated.")
    

  }
  addNewWifi = async(e) => {
    var idF = this.state.items[this.state.id_to_show]["id_facility"];
    console.log("Facility: "+idF)
    console.log("Nro Wifi to add: "+this.state.nrowifi_edit)
    const data = new FormData();  
    data.append("id_facility",idF)
    data.append("nrowifi",this.state.nrowifi_edit)
    var cont=0;
    for(var i=0;i<this.state.nrowifi_edit;i++){
      if(document.getElementById("inputwifissid2-"+i+"-"+this.state.id_to_show).value=='' || document.getElementById("inputwifipass2-"+i+"-"+this.state.id_to_show).value=='')   
         cont=1;       
            
    }
    if(this.state.nrowifi_edit>0){

    if(cont==0){
        for(var i=0;i<this.state.nrowifi_edit;i++){
                    
          data.append("ssid"+i,document.getElementById("inputwifissid2-"+i+"-"+this.state.id_to_show).value)
          data.append("pass"+i,document.getElementById("inputwifipass2-"+i+"-"+this.state.id_to_show).value)
          
        }
        console.log(stringifyFormData(data))
        await fetch('https://homedots.us/beddot/public/insertWifi', {
          method: 'POST',
          body: data,
        })   
        this.getData();
        this.state = {
          show: true,          
        };  
        toast.success("Successfull Wifi(s) addition.")
        const $ = window.$;
        $('#modalwifiadd'+this.state.id_to_show).modal('hide');
        this.setState({
          nrowifi_edit: 0
        })

      
    }
    else
    toast.error("All fields must be filled.")
  }else{
    toast.info("Please press + to add wifi.")
  }
    
  }

  
 
   

  //**********HANDLE COMPONENTS*************** */  
  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };
  
  inputChangedHandler = (event) => {    
    const target = event.target;
    const value = target.value;
    const name = target.name;  
    this.setState({
        [name]: value
    });
  };
  inputChangedHandler2 = (event) => {  
    var data =  event.target.id.split("-")
    let id = data[1]   
    let {items} = this.state; 
   
    if(data[0]=="inputwifissid") items[this.state.id_to_show]["wifiSSID"][id] = event.target.value; 
    if(data[0]=="inputwifipass") items[this.state.id_to_show]["wifiPASS"][id] = event.target.value; 
    this.setState({
      items
    })
  
  }

  handleEdit = async(e) => {
    e.preventDefault();
    const val = e.currentTarget.id;
    const fid = val.substring(5)      //fid contains the facility id I wanto to edit
    await this.setState({
      show: true,
      id_to_show:fid,
      nrowifi_edit:0
    });   
  }

//***********MOUNT FUNCTIONS****************** */

  componentDidMount(){
    this.getData();
    this.setState({
        show: false,
       
    });
  }

//***********CALLS TO ENDPOINTS****************** */

  getData = async() => {
    await fetch('https://homedots.us/beddot/public/getFacilities')
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        items:json.result,    
      })      
      console.log(this.state);
    })

  }

  modifyFacility = async(e,facility,vectornumber) => {
    console.log(facility)
    console.log(vectornumber)
    const data = new FormData();
    if(document.getElementById("changenamec"+vectornumber).value==''  ||
    document.getElementById("changecontact"+vectornumber).value==''   ||
    document.getElementById("changeemail"+vectornumber).value==''     ||
    document.getElementById("changedashboard"+vectornumber).value==''  ){
      toast.error("Error: All required fields must be filled."); 
    }else{
        data.append('newfname',document.getElementById("changenamec"+vectornumber).value)
        data.append('newfcontact',document.getElementById("changecontact"+vectornumber).value)
        data.append('newfemail',document.getElementById("changeemail"+vectornumber).value)
        data.append('newfdashboard',document.getElementById("changedashboard"+vectornumber).value)
        console.log(stringifyFormData(data));
        await fetch('https://homedots.us/beddot/public/updateFacilities/'+facility, {
          method: 'POST',
          body: data,
        })       
        this.getData();
        this.state = {
          show: true,          
        };
        toast.success("Successful Modification")
    }


  }

  addfacility = async(e) => {
    var resp;
    e.preventDefault();
    this.setState({
      buttoadd:"btn btn-primary",
    })
    //const data = new FormData(document.getElementById('formnew').value);   
    
    if(document.getElementById('newfacility_name').value=='' || 
       document.getElementById('newfacility_contact').value=='' ||
       document.getElementById('newfacility_email').value=='' || 
       document.getElementById('newfacility_dashboard').value=='' ||
       document.getElementById("mainwifiSSDI").value=='' ||
       document.getElementById("mainwifiPASS").value=='') {
        toast.error("Error: All required fields must be filled.");    
    }
    else{
      const data = new FormData();
      data.append('facilityName',document.getElementById('newfacility_name').value);
      data.append('facilityContact',document.getElementById('newfacility_contact').value);
      data.append('facilityEmail',document.getElementById('newfacility_email').value);
      data.append('facilityDashboard',document.getElementById('newfacility_dashboard').value);
      data.append('mainSSID',document.getElementById("mainwifiSSDI").value);
      data.append('mainPASS',document.getElementById("mainwifiPASS").value);
      data.append('NroWifiExtra',this.state.nrowifi);
      if(this.state.nrowifi>0){
        
        for(var i=0;i<this.state.nrowifi;i++){
           data.append('ExtraSSID'+i,document.getElementById('ssid-'+i).value);
           data.append('ExtraPASS'+i,document.getElementById('pass-'+i).value);
        }
      }
     
      //console.log(stringifyFormData(data))
      await fetch('https://homedots.us/beddot/public/addFacilities', {
        method: 'POST',
        body: data,
      })
      .then(res=>res.json())
      .then(json=>{
        resp=json.result
      })
      if(resp=="OK"){
        this.getData();
        this.state = {
          show: true,          
        };
        document.getElementById('newfacility_name').value='';
        document.getElementById('newfacility_contact').value='';
        document.getElementById('newfacility_email').value='';
        document.getElementById('newfacility_dashboard').value='';
        toast.success("Successful Save")
        this.setState({
          buttoadd:"hidden",
        })
      }
      else{
        toast.error("Error: All required fields must be filled.");      
      }


    }
    
    
    
        
    
  }
 

  handleUpdateUnits = async(e) => {
    e.preventDefault();
    const value = e.currentTarget.id;
    const fid = value.substring(12)
    const data = new FormData(document.getElementById("form"+fid));

    console.log(fid)
    console.log(stringifyFormData(data));
    
    await fetch('https://homedots.us/beddot/public/UpdateUnitsFacility', {
      method: 'POST',
      body: data,
    });

    this.getData();
    this.state = {
      show: true
    };
    toast.success("Successful Update")
    
  }
  handleAddUnits = async(e) => {
    e.preventDefault();
    const value = e.currentTarget.id;
    const fid = value.substring(12)
    const data = new FormData(document.getElementById("formadd"+fid));

    console.log(fid)
    console.log(stringifyFormData(data));
    
    await fetch('https://homedots.us/beddot/public/AddUnitsFacility', {
       method: 'POST',
       body: data,
     });
     this.getData();
     this.state = {
      show: true
    };
    toast.success("Successful Update")
     
    
    
  }
  handleFillUnits = async(e) => {    
    e.preventDefault();
    //console.log("entro");
    await fetch('https://homedots.us/beddot/public/getUnitsNoFacility')
    .then(res=>res.json())
    .then(json=>{
       this.setState({        
        NoUnits:json.result
      })      
      console.log(this.state.NoUnits);
    })
    
    
  }
  
  //****************RENDER FUNCTION****************** */
  
  render() {
    var { isLoaded , items} = this.state;
    const id_facility       = [];
    const name_facility     = [];
    const contact_facility  = [];
    const email_facility    = [];
    const dashboard_facility= [];
    const number_units = [];
    const units_id = [];
    const units_visible = [];
    const units_name = [];
    const number_wifi = [];
    const wifi_id = [];
    const wifi_ssid = [];
    const wifi_pass = [];

    var divStyle = {      
      width: '100px',
      display: 'inline-block'     
    };

    const edit1 = <Tooltip id="edit_tooltip">Edit</Tooltip>;
    const edit2 = <Tooltip id="edit_tooltip">Update</Tooltip>;
    const edit3 = <Tooltip id="edit_tooltip">Delete</Tooltip>;
    
   
    //**********TO BRING THE DATABASE DATA */
    if(!isLoaded){
      return <div>Loading...</div>;
    }
    else{
         

         for(var i=0 ; i < items.length ; i++){
            id_facility[i]      = items[i]["id_facility"];
            name_facility[i]    = items[i]["name_facility"];
            contact_facility[i] = items[i]["contact_facility"];
            email_facility[i]   = items[i]["email_facility"];
            dashboard_facility[i]= items[i]["dashboard_facility"];
            number_units[i]     = items[i]["number_units"];
            number_wifi[i]      = items[i]["number_wifi"];

            units_id[i] = [];
            units_visible[i] = [];
            units_name[i] = [];
            wifi_id[i] = [];
            wifi_ssid[i] = [];
            wifi_pass[i] = [];
            if(number_units[i]>0){                          
              for(var j=0 ; j < number_units[i] ; j++)
              {                
                units_id[i][j]  = items[i]["units"][j];
                units_visible[i][j] = items[i]["unitsvisible"][j];
                if(items[i]["unitname"][j]=="")
                  units_name[i][j] = items[i]["mac"][j];                
                else
                  units_name[i][j] = items[i]["unitname"][j];                
              }
            }
            if(number_wifi[i]>0){                          
              for(var j=0 ; j < number_wifi[i] ; j++)
              {                
                wifi_id[i][j]  = items[i]["wifiID"][j];
                wifi_ssid[i][j] = items[i]["wifiSSID"][j];
                wifi_pass[i][j] = items[i]["wifiPASS"][j];
                             
              }
            }
         }
    }

    

    //************TO SHOW ALL THE FACILITIES */
    var num=1;
    var units = [];
    var fillmodal= [];
    var charge =1;
    for (var num = 0; num < id_facility.length; num++) {
      units.push(
        <tr key={num}> 
                                                
              
              <td>{name_facility[num]}<input id={'id_facility'+num} key={'id_facility'+num} name={'id_facility'+num} type="hidden" defaultValue={id_facility[num]}></input></td>
              <td>{contact_facility[num]}</td>         
              <td>{email_facility[num]}</td>    
              <td className="td-actions text-left">
                  <OverlayTrigger placement="top" overlay={edit1}>
                    <Button id={'editb'+num} key={'editb'+num} name={'editb'+num} bsStyle="info" simple type="button" bsSize="xs" defaultValue={id_facility[num]} onClick={this.handleEdit}>
                        <i className="fa fa-edit" />
                    </Button>
                  </OverlayTrigger>
                  {/* <OverlayTrigger placement="top" overlay={deactivate}>
                    <Button id={'deactivateb'+num} key={'deactivateb'+num} name={'deactivateb'+num} bsStyle="info" simple type="button" bsSize="xs">
                        <i className="fa fa-ban" />
                    </Button>
                  </OverlayTrigger> */}
              </td>                                            
            </tr>
            
      )
  
    }

    //******* VALIDATING INSERT OF FACILITIES */

    var message = [];
    


    //************TO SHOW ALL THE UNITS THAT ARE NOT ASSIGNED TO ANY FACILITY */
    
    var { isLoaded , NoUnits} = this.state;
    var noUnitsFacility = [];
    const toaddUnitName = [];
    const toaddUnitId = [];
    if(this.state.NoUnits){
      for(var i=0 ; i < NoUnits.length ; i++){
        toaddUnitId[i]      =   NoUnits[i]["idUnit"];
        toaddUnitName[i]    =   NoUnits[i]["unitName"];
        console.log("arriba")
        if(toaddUnitName[i]==""){
           toaddUnitName[i]=NoUnits[i]["mac"];           
        }
        noUnitsFacility.push(            
          <div style={divStyle} className="online" id={'nounit'+i} key={'nounit'+i} name={'nounit'+i} >
                                  
                <Checkbox
                  id={i*10000}
                  key={'checkadd'+toaddUnitId[i]}
                  name={'checkadd'+toaddUnitId[i]}
                  number={i*10000}                
                  //isChecked='false'                                              
                />
                <label id={'labeladd'+i} key={'labeladd'+i} name={'labeladd'+i}>          
                  {toaddUnitName[i]}
                </label>
              
            
        </div>  
    
    )
      }
    }
    
    
    //************TO SHOW ALL THE UNITS THAT ARE ASSIGNED TO AN SPECIFIC FACILITY */

    var cardfacility = [];
    var newnum;
    if(this.state.show){
      newnum=this.state.id_to_show;
        for (var num2 = 0; num2 < number_units[newnum]; num2++) {                       
            
          fillmodal.push(            
                <div style={divStyle} className="online" id={'card'+newnum+'unit'+num2} key={'card'+newnum+'unit'+num2} name={'card'+newnum+'unit'+num2} >
                                        
                      <Checkbox
                        id={newnum*100+num2}
                        key={'checkunit'+units_id[newnum][num2]}
                        name={'checkunit'+units_id[newnum][num2]}
                        number={newnum*100+num2}                
                        //isChecked='false'                                              
                      />
                      <label id={'label'+newnum+'unit'+num2} key={'label'+newnum+'unit'+num2} name={'label'+newnum+'unit'+num2}>          
                        {units_name[newnum][num2]}
                      </label>
                    
                  
              </div>  
          
          )
          
      }

      //**************Modal for asking if the user is sure to remove the wifi from the database */
      var modal1 = []
      modal1.push(
        <div key={'div1-'+newnum} className="modal fade" id={"wifideletemodal"+newnum} tabIndex="-1" role="dialog" aria-labelledby="wifideletemodal" aria-hidden="true">
          <div key={'div2-'+newnum} className="modal-dialog modal-dialog-centered" role="document">
            <div key={'div3-'+newnum} className="modal-content">                                       
              <div key={'div4-'+newnum} className="modal-body">                                            
                  Are you sure you want to delete this Wifi configuration?
              </div>
            <div key={'div5-'+newnum} className="modal-footer">
              <Button id={'buttondd'+newnum+'1'} bsStyle="info" key={'buttondd'+newnum+'1'} fill type="button" className="btn btn-secondary" onClick={this.deletewifiDB} >
                  No
              </Button>
              <Button id={'buttonwifidelete'+newnum} bsStyle="info" key={'buttonwifidelete'+newnum} fill type="button" className="btn btn-primary" onClick={this.deletewifiDB} >
                  Yes
              </Button>                                  
            </div>
          </div>
        </div>
        </div>
      )

      //*************TO SHOW ALL THE WIFIs IN A FACILITY */

       var fillwifi = [];
       var fillwifi2 = [];
       var new3;
       if(number_wifi[newnum]==0){
        fillwifi.push(  
          <div key={"divotro"+newnum}>
            <h5 style={{ margin: 20 }}> No wifi configured yet</h5>
          </div>
        )
        fillwifi2.push(
          <div key={"divnew"+newnum}>
            <h5 style={{ margin: 20 }}> Click + for adding more Wifi</h5>
          </div>
        )
       }
       if(number_wifi[newnum]>0)
        fillwifi2.push(
          <div key={"divnew"+newnum}>
            <h5 style={{ margin: 20 }}> Click + for adding more Wifi</h5>
          </div>
        )
       

       for(new3=0;new3<number_wifi[newnum];new3++){
                 
            fillwifi.push(    
              
                <div id={"divagain-"+new3} key={"divagain-"+new3} name={"divagain-"+new3}>          
                    <ControlLabel style={{ margin: 10 }}>SSID :</ControlLabel>
                    <input id={"inputwifissid-"+new3+"-"+newnum} key={"inputwifissid-"+new3+"-"+newnum} name={"inputwifissid-"+newnum} value={wifi_ssid[newnum][new3]} onChange={this.inputChangedHandler2}></input>
                    <ControlLabel style={{ margin: 5 }}>Password :</ControlLabel>
                    <input type="password" id={"inputwifipass-"+new3+"-"+newnum} key={"inputwifipass-"+new3+"-"+newnum} name={"inputwifipass-"+newnum} value={wifi_pass[newnum][new3]} onChange={this.inputChangedHandler2}></input>
                    <OverlayTrigger placement="top" overlay={edit2}>
                    <Button id={"buttonmod-"+new3+"-"+newnum} style={{ margin: 5 }} bsStyle="info" fill onClick={this.modifyWifi}>
                        <i id={"buttonmod-"+new3+"-"+newnum} className="fa fa-pencil" aria-hidden="true" />
                    </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={edit3}>
                    <Button  id={"buttonmod-"+new3+"-"+newnum}  style={{ margin: 5 }} bsStyle="info" fill data-toggle="modal" data-target={"#wifideletemodal"+newnum} onClick={this.setnrodelete}>
                        <i id={"buttonnumber-"+new3+"-"+newnum} className="fa fa-times" aria-hidden="true" />
                    </Button>
                    </OverlayTrigger>
                    {modal1}
                </div>  
                    
                  
                    
                                                                                          
                 
            )
          
       }
       for(new3=0;new3<this.state.nrowifi_edit;new3++){
           
        if(new3==this.state.nrowifi_edit-1){
           fillwifi2.push(          
               <div id={"divagain2-"+new3} key={"divagain2-"+new3} name={"divagain2-"+new3}>          
                   <ControlLabel style={{ margin: 10 }}>SSID :</ControlLabel>
                   <input id={"inputwifissid2-"+new3+"-"+newnum} key={"inputwifissid2-"+new3+"-"+newnum} name={"inputwifissid2-"+new3+"-"+newnum}  onChange={this.inputChangedHandler2}></input>
                   <ControlLabel style={{ margin: 5 }}>Password :</ControlLabel>
                   <input type="password" id={"inputwifipass2-"+new3+"-"+newnum} key={"inputwifipass2-"+new3+"-"+newnum} name={"inputwifipass2-"+new3+"-"+newnum}  onChange={this.inputChangedHandler2}></input>
                   
                   <Button style={{ margin: 5 }} bsStyle="info" fill onClick={this.removeWifi_valid}>
                       <i className="fa fa-times" aria-hidden="true" />
                   </Button>
                 
                                                                                         
                 </div>  
           )
        }
        else{
          fillwifi2.push(          
            <div id={"divagain2-"+new3} key={"divagain2-"+new3} name={"divagain2-"+new3}>          
                <ControlLabel style={{ margin: 10 }}>SSID :</ControlLabel>
                <input id={"inputwifissid2-"+new3+"-"+newnum} key={"inputwifissid2-"+new3+"-"+newnum} name={"inputwifissid2-"+new3+"-"+newnum}  onChange={this.inputChangedHandler2}></input>
                <ControlLabel style={{ margin: 5 }}>Password :</ControlLabel>
                <input type="password" id={"inputwifipass2-"+new3+"-"+newnum} key={"inputwifipass2-"+new3+"-"+newnum} name={"inputwifipass2-"+new3+"-"+newnum}  onChange={this.inputChangedHandler2}></input>                                                                      
              </div>  
          )

        }
         
      }

      
    

       //************TO DISPLAY THE DATA TO MODIFY OF EACH FACILITY */

        cardfacility.push(
          <Card
                id="card1"
                name="card1"
                key="card1"
                title={"Facility "+name_facility[newnum]}
                content={
                  <div id="subcard" name="subcard" key="subcard" className="table-full-width">
                    {/* <form> */}
                      <FormInputs
                        ncols={["col-md-5", "col-md-3", "col-md-4"]}
                        properties={[
                          {
                            id : "changenamec"+newnum,
                            key: "changenamec"+newnum,
                            name: "changenamec"+newnum,
                            label: "Facility Name *",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Facility",
                            defaultValue: name_facility[newnum],
                            onChange : (event)=>this.inputChangedHandler(event)
                          },
                          {
                            id : "changecontact"+newnum,
                            key: "changecontact"+newnum,
                            name: "changecontact"+newnum,
                            label: "Primary Contact *",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Contact",
                            defaultValue: contact_facility[newnum],
                            onChange : (event)=>this.inputChangedHandler(event),
                          },
                          {
                            id: "changeemail"+newnum,
                            key: "changeemail"+newnum,
                            name: "changeemail"+newnum,
                            label: "Email address *",
                            type: "email",
                            bsClass: "form-control",
                            placeholder: "email",
                            defaultValue: email_facility[newnum],
                            onChange : (event)=>this.inputChangedHandler(event)
                          }
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-10","col-md-2"]}
                        properties={[
                          {
                            id : "changedashboard"+newnum,
                            key: "changedashboard"+newnum,
                            name: "changedashboard"+newnum,
                            label: "Dashboard Name *",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "",
                            defaultValue: dashboard_facility[newnum],
                            //disabled: true,
                            onChange : (event)=>this.inputChangedHandler(event)
                          }, 
                          {
                            id : "butti"+newnum,
                            label: "Action",
                            type: "button",
                            bsStyle: "info",
                            value: "Update",                              
                            className:"btn-primary",                         
                            onClick : (event)=>this.modifyFacility(event,id_facility[newnum],newnum)
                          },               

                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-2","col-md-2"]}
                        properties={[
                          {
                            id : "changenumber"+newnum,
                            label: "# of units",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Facility",
                            value: number_units[newnum],
                            disabled: true,
                            onChange : (event)=>this.inputChangedHandler(event)
                          },  
                          
                            {
                              id : "changewifi"+newnum,
                              label: "# of Wifi available",
                              type: "text",
                              bsClass: "form-control",                              
                              value: number_wifi[newnum],
                              disabled: true,
                              //onChange : (event)=>this.inputChangedHandler(event)
                            },               
  
                                       

                        ]}
                      />
                      {/* <Grid> */}
                        {/* <Row>   */}

                            <Button type="button" bsStyle="info" fill data-toggle="modal" data-target={"#exampleModalCenter2"+newnum} onClick={this.handleFillUnits}>Add Units</Button>
                            <div className="modal fade" id={"exampleModalCenter2"+newnum} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="exampleModalLongTitle2">Units assigned to {name_facility[newnum]}</h4>
                                            <h5 className="modal-title" id="exampleModalLongTitle2">Check for adding the units</h5>
                                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div className="modal-body">
                                            <form  method="post" id={"formadd"+newnum}> 
                                            <input id={'PassUnit2'} key={'PassUnit2'} name={'PassUnit2'} type="hidden" defaultValue={id_facility[newnum]}></input>                                                                                                              
                                            <input id={'AmountUnits2'} key={'AmountUnits2'} name={'AmountUnits2'} type="hidden" defaultValue={number_units[newnum]}></input>                                                                                                              
                                              {noUnitsFacility}

                                            </form>
                                            
                                        </div>
                                        <div className="modal-footer">
                                        <Button id={'button'+newnum+'1'} bsStyle="info" key={'button'+newnum+'1'} fill type="button" className="btn btn-secondary" data-dismiss="modal" >
                                            Close
                                          </Button>
                                          <Button id={'buttonupdate'+newnum} bsStyle="info" key={'buttonupdate'+newnum} fill type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleAddUnits}>
                                           Update
                                          </Button>                                  
                                        </div>
                                      </div>
                                    </div>
                                  </div>




                            <Button type="button" bsStyle="info" fill data-toggle="modal" data-target={"#exampleModalCenter"+newnum}>Remove Units</Button>
                            <div className="modal fade" id={"exampleModalCenter"+newnum} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="exampleModalLongTitle">Units assigned to {name_facility[newnum]}</h4>
                                            <h5 className="modal-title" id="exampleModalLongTitle">Check units you want to remove</h5>
                                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div className="modal-body">
                                            <form  method="post" id={"form"+newnum}> 
                                            <input id={'PassUnit'} key={'PassUnit'} name={'PassUnit'} type="hidden" defaultValue={id_facility[newnum]}></input>                                                                                                              
                                            <input id={'AmountUnits'} key={'AmountUnits'} name={'AmountUnits'} type="hidden" defaultValue={number_units[newnum]}></input>                                                                                                              
                                              {fillmodal}

                                            </form>
                                            
                                        </div>
                                        <div className="modal-footer">
                                        <Button id={'button'+newnum+'1'} bsStyle="info" key={'button'+newnum+'1'} fill type="button" className="btn btn-secondary" data-dismiss="modal" >
                                            Close
                                          </Button>
                                          <Button id={'buttonupdate'+newnum} bsStyle="info" key={'buttonupdate'+newnum} fill type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleUpdateUnits}>
                                           Update
                                          </Button>                                  
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <Button  type="button" bsStyle="info" fill data-toggle="modal" data-target={"#modalwifiadd"+newnum} onClick={this.handleFillWifi}>Add Wifi</Button>
                                  <div className="modal fade" id={"modalwifiadd"+newnum} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="exampleModalLongTitle">Wifi connection available at {name_facility[newnum]}</h4>
                                            
                                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div className="modal-body">
                                          <div>
                                              <Col md={12}>
                                              <ControlLabel style={{ margin: 10 }}>Wifi *</ControlLabel>
                                              <Button bsStyle="info" fill id={"buttonAddWifi2-"+newnum} key={"buttonAddWifi2-"+newnum} name={"buttonAddWifi2-"+newnum} onClick={this.addwifi2}>
                                                <i className="fa fa-plus" aria-hidden="true" />
                                              </Button>
                                              </Col>  
                                          </div>
                                        {fillwifi2}
                                            
                                        </div>
                                        <div className="modal-footer">
                                        <Button id={'buttonadd'+newnum+'1'} bsStyle="info" key={'buttonadd'+newnum+'1'} fill type="button" className="btn btn-secondary" data-dismiss="modal" >
                                            Close
                                          </Button>
                                          <Button id={'buttonwifiadd'+newnum} bsStyle="info" key={'buttonwifiadd'+newnum} fill type="button" className="btn btn-primary" onClick={this.addNewWifi} >
                                           Update
                                          </Button>                                  
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                 
                                  <Button  type="button" bsStyle="info" fill data-toggle="modal" data-target={"#modalwifi"+newnum} >Update Wifi</Button>
                                  <div className="modal fade" id={"modalwifi"+newnum} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="exampleModalLongTitle">Wifi connection available at {name_facility[newnum]}</h4>
                                            
                                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div className="modal-body">
                                         
                                        {fillwifi}
                                            
                                        </div>
                                        <div className="modal-footer">
                                        <Button id={'button'+newnum+'1'} bsStyle="info" key={'button'+newnum+'1'} fill type="button" className="btn btn-secondary" data-dismiss="modal" >
                                            Close
                                          </Button>
                                                                           
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                            
                           
                          {/* </Row> */}
                      {/* </Grid> */}
                    {/* </form> */}
                      
                    
                  </div>
                }
                
            />
        )
      }

      //*****************Fill modal of new facility */
      var newfacilitymodal = [];
      var fillwifipass =[];
      for(var k=0;k<this.state.nrowifi;k++){
        if(k==this.state.nrowifi-1){
            fillwifipass.push(
              <div d={"div-"+k} key={"div-"+k} name={"div-"+k}>          
                <ControlLabel style={{ margin: 20 }}>SSID :</ControlLabel>
                <input id={"ssid-"+k} key={"ssid-"+k} name={"ssid-"+k}></input>
                <ControlLabel style={{ margin: 10 }}>Password :</ControlLabel>
                <input type="password" id={"pass-"+k} key={"pass-"+k} name={"pass-"+k}></input>
                <Button style={{ margin: 10 }} bsStyle="info" fill onClick={this.removeWifi}>
                    <i className="fa fa-times" aria-hidden="true" />
                </Button>
                                                                                      
              </div>  
            );  
          }
          else{
            fillwifipass.push(
              <div d={"div-"+k} key={"div-"+k} name={"div-"+k}>          
                <ControlLabel style={{ margin: 20 }}>SSID :</ControlLabel>
                <input id={"ssid-"+k} key={"ssid-"+k} name={"ssid-"+k}></input>
                <ControlLabel style={{ margin: 10 }}>Password :</ControlLabel>
                <input type="password" id={"pass-"+k} key={"pass-"+k} name={"pass-"+k}></input>                                                                                                      
              </div>  
            );  
          }          
      
      }    
      newfacilitymodal.push(
          <Card

                id="cardnewf"
                name="cardnewf"
                key="cardnew"
                //title={"Facility "+name_facility[newnum]}
                content={
                  <div id="subcard" name="subcard" key="subcard" className="table-full-width">
                    {/* <form> */}
                      <FormInputs
                        ncols={["col-md-5", "col-md-3", "col-md-4"]}
                        properties={[
                          {
                            id : "newfacility_name",
                            label: "Facility Name *",
                            type: "text",
                            bsClass: "form-control",
                            onChange : (event)=>this.inputChangedHandler(event)
                            
                          },
                          {
                            id : "newfacility_contact",
                            label: "Primary contact *",
                            type: "text",
                            bsClass: "form-control",
                            onChange : (event)=>this.inputChangedHandler(event)
                            
                          },
                          {
                            id : "newfacility_email",
                            label: "Email *",
                            type: "email",
                            bsClass: "form-control",
                            onChange : (event)=>this.inputChangedHandler(event)
                            
                          }
                          
                        ]}
                      
                      />
                      <FormInputs
                        ncols={["col-md-12"]}
                        properties={[
                          {
                            id : "newfacility_dashboard",
                            label: "Facility Summary Dashboard Name *",
                            type: "text",
                            bsClass: "form-control",
                            onChange : (event)=>this.inputChangedHandler(event)
                            
                          }                          
                          
                        ]}
                        
                      />
                      <div>
                          <Col md={12}>
                          <ControlLabel style={{ margin: 10 }}>Wifi *</ControlLabel>
                          <Button bsStyle="info" fill id="buttonAddWifi" key="buttonAddWifi" name="buttonAddWifi" onClick={this.addWifi}>
                            <i className="fa fa-plus" aria-hidden="true" />
                          </Button>
                          </Col>  
                      </div>
                      <div>
                          
                          <ControlLabel style={{ margin: 20 }}>SSID*:</ControlLabel>
                          <input id="mainwifiSSDI" key="mainwifiSSDI" name="mainwifiSSDI" ></input>
                          <ControlLabel style={{ margin: 10 }}>Password*:</ControlLabel>
                          <input type="password" id="mainwifiPASS" key="mainwifiPASS" name="mainwifiPASS"></input>
                          
                      </div>     
                      {fillwifipass}                
                      
                      
                      
                    </div>
                    
                }
                
          />
          

      )
    
      

    

      //*************the render function */

    return(
      <div className="content" >
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Facilities Administration"
                //category="Based on last picture"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Table striped hover>
                      <thead>
                      <tr> 
                          <td>Facility Name</td>
                          <td>Primary Contact</td>
                          <td>Email</td>
                          <td>Action</td>
                        </tr>
                        {units}
                      </thead>
                      
                    </Table>
                   
                    <Button id='addb' bsStyle="info" key='addb' fill type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.cleanNewFacility}>New Facility</Button>
                      <form  method="post" id="formnew"> 
                        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title" id="exampleModalLongTitle">Add new Facility</h4>                                            
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                    </div>
                                    <div className="modal-body">
                                        {newfacilitymodal}
                                    </div>
                                    <div className="modal-footer">
                                        <Button id='addfab1' bsStyle="info" key='addfab1' fill type="button" className="btn btn-secondary" data-dismiss="modal" >
                                            Close
                                        </Button>
                                        <Button id='addfab2' bsStyle="info" key='addfab2' fill type="button" className={this.state.buttoadd} onClick={this.addfacility}>
                                            Save
                                        </Button>                                
                                    </div> 
                                </div>
                            </div>
                        </div> 
                      </form>
                    </div>
                }
              />
            </Col>

            
          </Row>
        </Grid>
        {cardfacility}        
        {message}
        <div> <ToastContainer /> </div>
      </div>

      
      
    );
  }
}

export default ApprovedFacilitties;

function stringifyFormData(fd) {
  const data = {};
	for (let key of fd.keys()) {
  	data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}