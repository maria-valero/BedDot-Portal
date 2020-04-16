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
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { Tooltip , OverlayTrigger } from "react-bootstrap";
//import { FormGroup, ControlLabel, FormControl, Row } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar from "assets/img/faces/face-0.jpg";



class SecurityProfile extends Component {


  //*****CONSTRUCTOR */
  constructor(props){
    //alert("-----");
    super(props);
    this.state={
      items:[],
      itemdata:[],
      isLoaded:false,       
      id:[],    
      profiles:[],  
      UserB:"",  
      selected1:"",
      mo:"btn btn-primary",          //To close modal of password
      mo2: "btn btn-primary",        // To close modal update
      selectedFile : null,
          
    }
    
  }

  //****COMPONENTS FUNCTIONS */
  componentDidMount(){    
    this.getFacilities();       
  }

  fileSelecterHandler = async(e) => {
    e.preventDefault();
    await this.setState({
      selectedFile : e.target.files[0]
    })
    //console.log(this.state.selectedFile)
  
  }

 

  onChange2(e) {
        
    var data =  e.target.id.split("-")
    let id = data[1]
    let {itemdata} = this.state;
    
    if(data[0]=="changename") itemdata[id]["name"] = e.target.value;
    if(data[0]=="changelast") itemdata[id]["lastName"] = e.target.value;
    if(data[0]=="changeuser") itemdata[id]["username"] = e.target.value;  
    if(data[0]=="changephone") itemdata[id]["phone"] = e.target.value;
    if(data[0]=="changeemail") itemdata[id]["email"] = e.target.value;
    this.setState({
      itemdata
    })
    
  }
  

  changeSelect = (event) => {   
    //console.log("onchange") 
    const target = event.target;
    const value = target.value;
    const name = target.name;  
    //console.log(name)
    //console.log(value)
    this.setState({        
        selected1:value
        
    });
    
  };

  getFacilities = async() => {
    await fetch('https://homedots.us/beddot/public/getFacilities')
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        items:json.result,    
      })           
    })
      
   var x = document.querySelector('#Select1').value;   
   this.getUsers(x);       //This function must be called in the handle too.
   this.setState({
     id:x
   })

  }
  getUsers = async(x) => {
    //console.log("PRINTING HERE "+x)
     await fetch('https://homedots.us/beddot/public/getUsers/'+x)
     .then(res=>res.json())
     .then(json=>{
       this.setState({
         isLoaded:true,
         itemdata:json.result,                   
          
       })      
       //console.log(this.state.itemsdata);
     })
     await fetch('https://homedots.us/beddot/public/getProfiles')
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        profiles:json.result,    
      })           
    })
    
    
  }
  handlemodal = async(e) =>{
    e.preventDefault();
    var val = e.target.id
    //console.log("ENTROOOOOOOOOOOO")
    this.setState({
      mo2:"btn btn-primary"
    })
    var letter=val.charAt(0)
    var x
    var idPp;
    if(letter=='i'){
      x=val.substring(2);
      idPp=this.state.itemdata[x]["idUser"];
    }
    else{
      x=val.substring(7);
      idPp=this.state.itemdata[x]["idUser"];
    }
    this.setState({
      UserB : idPp,
      selected1: this.state.itemdata[x]["idProfile"],
    })
 
  }

  handleDrop = async(e) =>{
    var id_facility=document.querySelector('#Select1').value;  
    this.getUsers(id_facility);
    this.setState({
      id:id_facility,
    })
  }

  clearModal = async(e) =>{
    e.preventDefault();
    var ele = e.target.id;   
    ele = ele.substring(5);    
    this.setState({
      mo:""
    })
    document.getElementById("newP"+ele).value="";
    document.getElementById("currentP"+ele).value="";
    document.getElementById("rnewP"+ele).value="";
  }

  handleChangePass = async(e) =>{
    var resp;
    e.preventDefault();
    var ele = e.target.id;
    ele = ele.substring(10);
    var realele = this.state.itemdata[ele]["idUser"];
    //realele has the ID of the user to change the password.
    var currentP = document.getElementById("currentP"+ele).value;
    var newP = document.getElementById("newP"+ele).value;
    var rnewP = document.getElementById("rnewP"+ele).value;
    //console.log(currentP+" "+newP+" "+rnewP)

    this.setState({
      mo:"btn btn-primary"
    })
    
    if(currentP!=""){
        await fetch('https://homedots.us/beddot/public/verifyPass/'+realele+'/'+currentP)
        .then(res=>res.json())
        .then(json=>{
          resp=json.result
        })   

        if(resp["value"]==0){
          toast.error("Invalid current password. Try again"); 
          this.setState({
            mo:"btn btn-primary"
          })
        }else{
            
        
            if(newP!="" && rnewP!=""){
               if(newP==rnewP){
                await fetch('https://homedots.us/beddot/public/updatePass/'+realele+'/'+newP)
                  toast.success("Good") 
                  this.setState({
                    mo:"hidden"
                  })
               }
               else{
                toast.error("New Passwords have to match");
               }

            }
            else{
              toast.error("Please fill all the required fields");
            }
      }
    }
    else{
      toast.error("Please fill all the required fields"); 
    }

    //console.log(resp["value"])
    
  }
  updateData = async(e) =>{
    var resp;
    e.preventDefault();
    this.setState({
      mo2:"btn btn-primary"
    })
    var ele = e.target.id;
    ele = ele.substring(7);
    var realele = this.state.itemdata[ele]["idUser"];
    const data = new FormData();
    if(document.getElementById("changename-"+ele).value==''  ||
    document.getElementById("changelast-"+ele).value==''   ||
    document.getElementById("changephone-"+ele).value==''     ||
    document.getElementById("changeemail-"+ele).value==''  ){
      toast.error("Error: All required fields must be filled."); 
    }else{
        data.append('iduser',realele)
        data.append('newname',document.getElementById("changename-"+ele).value)
        data.append('newlast',document.getElementById("changelast-"+ele).value)
        data.append('newphone',document.getElementById("changephone-"+ele).value)
        data.append('newemail',document.getElementById("changeemail-"+ele).value)
        data.append('newprofile',document.getElementById("Select2").value)
        //console.log(stringifyFormData(data));
        await fetch('https://homedots.us/beddot/public/updateProfile', {
            method: 'POST',
            body: data,
        });      
        var x = document.querySelector('#Select1').value;   
        this.getUsers(x);       //This function must be called in the handle too.
        this.setState({
            id:x
        })
        this.state = {
          show: true,          
        };
        this.setState({
          mo2:"hidden"
        })
        toast.success("Successful Modification")
    }


  }
  
  deleteUser = async(e) =>{
    var resp;
    var ele = e.target.id;
    ele = ele.substring(9);
    var realele = this.state.itemdata[ele]["idUser"];
    console.log(realele)
    //call endpoint sending the user to delete.
    await fetch('https://homedots.us/beddot/public/deleteUser/'+realele)
        .then(res=>res.json())
        .then(json=>{
          resp=json.result
        })
    toast.success("User deleted!")
    var x = document.querySelector('#Select1').value;   
   this.getUsers(x);       //This function must be called in the handle too.
   this.setState({
     id:x
   })



  }


 

  render() {

    //*****Load the facilities in the list */
    const edit1 = <Tooltip id="edit_tooltip">Edit</Tooltip>;
    const edit2 = <Tooltip id="delete_tooltip">Delete</Tooltip>;
    var { isLoaded , items, itemdata, profiles} = this.state;
    var loadcards = []; //to make push
   
    var idUser = [];
    var idFacility = [];
    var idProfile = [];
    var nameProfile=[];
    var name = [];
    var lastName = [];
    var username = [];
    var password = [];
    var phone = [];
    var email = [];
    var picture = [];
    var profiles_id = [];
    var profiles_name = [];
    var loadprofiles = [];
    var loadselect=[];
      if(isLoaded){
        var adding = [];
        var total_facilities=items.length;
        var id_facility = [];
        var name_facility = [];
        for(var i=0;i<total_facilities;i++){
          id_facility[i]=items[i]["id_facility"];
          name_facility[i]=items[i]["name_facility"];
          adding.push(
          <option id={"drop"+i} key={"drop"+i} name={"drop"+i} value={id_facility[i]}>{name_facility[i]}</option>
          );
        }
        
        
        if(this.state.itemdata.length>0){
          loadcards=[];
          for(var i=0 ; i < itemdata.length ; i++){
            idUser[i]       = itemdata[i]["idUser"];
            idFacility[i]   = itemdata[i]["idFacility"];
            idProfile[i]    = itemdata[i]["idProfile"];
            nameProfile[i]  = itemdata[i]["nameProfile"]
            name[i]         = itemdata[i]["name"];
            lastName[i]     = itemdata[i]["lastName"];
            username[i]     = itemdata[i]["username"];
            password[i]     = itemdata[i]["password"];
            phone[i]        = itemdata[i]["phone"];
            email[i]        = itemdata[i]["email"];
            picture[i]      = itemdata[i]["picture"];
            if(picture[i]==""){
              picture[i] = avatar;
            }

            if(this.state.profiles.length>0 && this.state.UserB!="" && idUser[i] == this.state.UserB){
              
              for(var j=0 ; j < profiles.length ; j++){
                profiles_id[j]  =   profiles[j]["idProfile"];
                profiles_name[j]  =   profiles[j]["nameProfile"];                   
                  loadprofiles.push(
                        <option id={"perfil"+profiles_id[j]} key={"perfil"+profiles_id[j]} name={profiles_id[j]} value={profiles_id[j]}>{profiles_name[j]}</option>
                  )                
              }
                           
                
            }
        
        
            
            //console.log("STATE SELECTED "+this.state.selected1)
            
            loadcards.push(
                 
              <Col md={3} id = {"col"+i} key= {"col"+i}>
                <UserCard
                  id = {"card"+i}
                  key = {"card"+i}
                  bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                  avatar={picture[i]}
                  name={name[i]+" "+lastName[i]}
                  userName={username[i]}
                  description={
                    <span>
                      Profile: {nameProfile[i]} <br />
                      Phone: {phone[i]} <br />
                      Email: {email[i]}
                    </span>
                    
                  }
                  socials={
                    <div id = {"div"+i} key= {"div"+i}>
                      <OverlayTrigger placement="top" overlay={edit1}>
                        <Button id = {"buttonA"+i} key= {"buttonA"+i} simple data-toggle="modal" data-target={"#exampleModalCenter"+i} onClick={this.handlemodal}>
                          <i id = {"iA"+i} key= {"iA"+i} className="fa fa-pencil" />
                        </Button>
                      </OverlayTrigger> 
                                <div className="modal fade" id={"exampleModalCenter"+i} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title" id="exampleModalLongTitle">Updating User Profile Information</h5>
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div className="text-left" style={{ margin: 20 }}>
                                      
                                        <Card 
                                          id="card1"
                                          name="card1"
                                          key="card1"
                                          title={"User: "+name[i]+" "+lastName[i]}
                                          content={
                                            <div id="subcard" name="subcard" key="subcard" className="table-full-width" style={{ margin: 5 }}>
                                                {/* <ControlLabel>Name *</ControlLabel>
                                                <input id={"changename"+i} key={"changename"+i} name={"changename"+i} type="text" value={name[i]} onChange={this.inputChangedHandler}></input> */}
                                                <FormInputs
                                                  ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                                                  properties={[
                                                    {
                                                      id : "changename-"+i,
                                                      key: "changename-"+i,
                                                      name: "changename-"+i,                                                   
                                                      label: "Name *",
                                                      type: "text",
                                                      bsClass: "form-control",                                                                                                                                                                 
                                                      value: name[i],
                                                      onChange: (event)=>this.onChange2(event)
                                                      
                                                    },
                                                    {
                                                      id : "changelast-"+i,
                                                      key: "changelast-"+i,
                                                      name: "changelast-"+i,
                                                      label: "Last Name *",
                                                      type: "text",
                                                      bsClass: "form-control",                                                      
                                                      value: lastName[i],
                                                      onChange: (event)=>this.onChange2(event)
                                                    },
                                                    {
                                                      id : "changeuser-"+i,
                                                      key: "changeuser-"+i,
                                                      name: "changeuser-"+i,
                                                      label: "Username *",
                                                      type: "text",
                                                      bsClass: "form-control",                                                      
                                                      value: username[i],
                                                      disabled: true,
                                                      onChange: (event)=>this.onChange2(event)
                                                    },
                                                    {
                                                      id : "butti"+i,
                                                      label: "Change",
                                                      type: "button",
                                                      bsStyle: "info",                                                      
                                                      value: "Password",                              
                                                      className:"btn-primary", 
                                                      "data-toggle":"modal", 
                                                      "data-target":"#changepassmodal"+i, 
                                                      onChange: (event)=>this.onChange2(event)
                                                     
       
                                                      //onClick : (event)=>this.modifyFacility(event,id_facility[newnum],newnum)
                                                    },

                                                  ]}
                                                />
                                                <FormInputs
                                                  ncols={["col-md-3", "col-md-6"]}
                                                  properties={[
                                                    {
                                                      id : "changephone-"+i,
                                                      key: "changephone-"+i,
                                                      name: "changephone-"+i,
                                                      label: "Phone *",
                                                      type: "text",
                                                      bsClass: "form-control",                                                      
                                                      value: phone[i],
                                                      onChange: (event)=>this.onChange2(event)
                                                    },
                                                    {
                                                      id : "changeemail-"+i,
                                                      key: "changeemail-"+i,
                                                      name: "changeemail-"+i,
                                                      label: "Email *",
                                                      type: "text",
                                                      bsClass: "form-control",                                                      
                                                      value: email[i],
                                                      onChange: (event)=>this.onChange2(event)
                                                    },
                                                                                                      

                                                  ]}
                                                />
                                                <ControlLabel>Security Profile</ControlLabel>
                                                {/* {loadselect} */}
                                                <select id="Select2" key="Select2" name={idProfile[i]} style={{ margin: 20 }} value={this.state.selected1} onChange={this.changeSelect}>
                                                   {loadprofiles}
                                                </select>

                                                <ControlLabel>Upload Picture</ControlLabel>
                                                  {/* <Button bsStyle="info"  fill type="button" style={{ margin: 20 }}>Search</Button> */}
                                                  <input type="file" onChange={this.fileSelecterHandler}></input>
                                              
                                              </div>
                                            }
                                          />
                                    </div>
                                    <div className="modal-footer">
                                    <Button id={'button'+i} bsStyle="info" key={'button'+i} fill type="button" className="btn btn-secondary" data-dismiss="modal" >
                                        Close
                                      </Button>
                                      <Button id={'buttonU'+i} bsStyle="info" key={'buttonU'+i} fill type="button" className={this.state.mo2} onClick={this.updateData} defaultValue={i} >
                                        Update
                                      </Button>                                  
                                    </div>
                                  </div>
                                </div>
                              </div>
                      <OverlayTrigger placement="top" overlay={edit2} >
                        <Button id = {"buttonB"+i} key= {"buttonB"+i} simple data-toggle="modal" data-target={"#exampleModalCenter2"+i}>
                          <i id = {"iB"+i} key= {"iB"+i} className="fa fa-trash" />
                        </Button>
                      </OverlayTrigger>
                      <div className="modal fade" id={"exampleModalCenter2"+i} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                  <div className="modal-content">
                                    {/* <div className="modal-header">
                                      <h5 className="modal-title" id="exampleModalLongTitle">Deleting System User</h5>
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div> */}
                                    <div className="text-left" style={{ margin: 20 }}>                                      
                                        Are you sure you want to delete user: {username[i]} ?
                                    </div>
                                    <div className="modal-footer">
                                    <Button id={'button'+i} bsStyle="info" key={'button'+i} fill type="button" className="btn btn-secondary" data-dismiss="modal" >
                                        Close
                                      </Button>
                                      <Button id={'buttonCON'+i} bsStyle="info" key={'buttonCON'+i} fill type="button" className="btn btn-primary" data-dismiss="modal" defaultValue={i} onClick={this.deleteUser} >
                                        Delete
                                      </Button>                                  
                                    </div>
                                  </div>
                                </div>
                              </div>
                      {/* <Button id = {"buttonC"+i} key= {"buttonC"+i} simple>
                        <i id = {"iC"+i} key= {"iC"+i} className="fa fa-google-plus-square" />
                      </Button> */}


                       {/* MODAL TO CHANGE PASSWORD */}
                       <div className="modal fade" id={"changepassmodal"+i} tabIndex="-1" role="dialog" aria-labelledby="changepassmodal" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title" id="exampleModalLongTitle">Updating {username[i]}'s Password </h5>
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div className="text-left" style={{ margin: 20 }}>
                                    <ControlLabel>Type your current password: *</ControlLabel>
                                    <input id={'currentP'+i} key={'currentP'+i} name={'currentP'+i}  type="password" className="form-control" ></input>
                                    <ControlLabel>Type your new password: *</ControlLabel>
                                    <input id={'newP'+i} key={'newP'+i} name={'newP'+i}  type="password" className="form-control" ></input>
                                    <ControlLabel>Re-Type your new password: *</ControlLabel>
                                    <input id={'rnewP'+i} key={'rnewP'+i} name={'rnewP'+i}  type="password" className="form-control" ></input>
                                    </div>
                                    <div className="modal-footer">
                                    <Button id={'buttonP'+i} bsStyle="info" key={'buttonP'+i} fill type="button" className="btn btn-secondary" data-dismiss="modal" >
                                        Close
                                      </Button>
                                      <Button  id={'buttonPass'+i} bsStyle="info" key={'buttonPass'+i} fill type="button" className={this.state.mo}  defaultValue={i} onClick={this.handleChangePass}  >
                                         Update 
                                      </Button>                                  
                                    </div>
                                  </div>
                                </div>
                              </div>
                          


                    </div>
                  }
                />
              </Col>
              

            )
            
          }

        }else{
          loadcards.push(
            <h5 id = {"h"+i} key= {"h"+i}>No registered users for this facility.</h5>
          )
        }
      }
      
      
    return (
      <div className="content">
        <table>
          <tbody>
            <tr>
            <td><ControlLabel>Please select the facility</ControlLabel></td>   
              <td>
                  <select id="Select1" key="Select1" name="Select1"  style={{ margin: 20 }} onChange={this.handleDrop}>
                  {adding}          
                  </select>
              </td>
            
          </tr>
          </tbody>
        </table>
        <Grid fluid>
          <Row>            
            {loadcards}
          </Row>
        </Grid>
        <div> <ToastContainer /> </div>
      </div>
    );
  }
}

export default SecurityProfile;

function stringifyFormData(fd) {
  const data = {};
	for (let key of fd.keys()) {
  	data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}