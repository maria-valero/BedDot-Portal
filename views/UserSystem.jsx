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

import avatar from "assets/img/faces/face-0.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import axios from 'axios';


class UserSystem extends Component {

  //*****CONSTRUCTOR */
  constructor(props){
    //alert("-----");
    super(props);
    this.state={      
      items:[],
      isLoaded:false,  
      profiles:[],   
      name : "",
      last: "",
      username: "",
      email: "",
      phone: "",
      current: "",
      selectedFile : null,
      photo: avatar,
    }
    
  }
  //****COMPONENTS FUNCTIONS */
  componentDidMount(){    
    this.getFacilities();  
    this.getProfiles();
    this.setState({
      photo: avatar,
    })
    console.log(this.state.photo)

  }

  inputChangedHandler = (event) => {    
    const target = event.target;
    const value = target.value;
    const name = target.name;  
    this.setState({
        [name]: value
    });
  };

  updateCurrent = async(e) => {
    console.log(e.target.value)
    for(var i=0;i<this.state.profiles.length;i++){
        if(this.state.profiles[i]["idProfile"]==e.target.value){
          this.setState({
            current:this.state.profiles[i]["nameProfile"],
          })
        }
    }
  }

  handleChange = async(e) => {
    var ob = e.target.id;    
    if(ob=="fname"){
      this.setState({
        name : e.target.value
      })
    }
    if(ob=="lname"){
      this.setState({
        last : e.target.value
      })
    }
    if(ob=="uname"){
      this.setState({
        username : e.target.value
      })
    }
    if(ob=="email"){
      this.setState({
        email : e.target.value
      })
    }
    if(ob=="phone"){
      this.setState({
        phone : e.target.value
      })
    }
  }

  getProfiles= async() => {

  await fetch('https://homedots.us/beddot/public/getProfiles')
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        profiles:json.result,    
       
      })           
    })
    var up = this.state.profiles[0]['nameProfile']
    this.setState({
      current:up,
    })
  }

  getFacilities = async() => {
    await fetch('https://homedots.us/beddot/public/getFacilities')
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        items:json.result,    
      })           
    })   

  }

  saveUser = async(e) => {
    e.preventDefault();
    var resp;
    const data = new FormData();
    if(document.getElementById("fname").value==''  ||
    document.getElementById("lname").value==''   ||
    document.getElementById("email").value==''     ||
    document.getElementById("uname").value==''     ||
    document.getElementById("pass1").value==''     ||
    document.getElementById("pass2").value==''     ||
    document.getElementById("phone").value==''  ){
      toast.error("Error: All required fields must be filled."); 
      if(document.getElementById("pass1").value!=document.getElementById("pass2").value){
        toast.error("Error: passwords must match."); 
      }
    }else{
        if(document.getElementById("pass1").value!=document.getElementById("pass2").value){
          toast.error("Error: passwords must match."); 
        }
        else{
           data.append('name',document.getElementById("fname").value)
           data.append('last',document.getElementById("lname").value)
           data.append('email',document.getElementById("email").value)
           data.append('phone',document.getElementById("phone").value)
           data.append('username',document.getElementById("uname").value)
           data.append('password',document.getElementById("pass1").value)
           data.append('idfacility',document.getElementById("Select1").value)
           data.append('idprofile',document.getElementById("Select2").value)
           //console.log(stringifyFormData(data))

           //verify username  verifyUsername
           await fetch('https://homedots.us/beddot/public/verifyUsername/'+document.getElementById("uname").value)
            .then(res=>res.json())
            .then(json=>{
              resp=json.result
            })   
          if(resp["value"]==1){
              toast.error("Username has already taken. Please choose another"); 
          }else{
            console.log(this.state.selectedFile.type)
            if(this.state.selectedFile.type!="image/png" && this.state.selectedFile.type!="image/jpeg" && this.state.selectedFile.type!="image/jpg"){
              toast.error("Not valide image. Please select png or jpeg images"); 
            }else{
                  await fetch('https://homedots.us/beddot/public/newUser', {
                  method: 'POST',
                  body: data,
                  })
                  .then(res=>res.json())
                  .then(json=>{
                    resp=json.result
                  })
                  var NEWid =resp.id;

                  // Sending photo
                  const fd = new FormData();
                  fd.append('image',this.state.selectedFile);
                  fd.append('name',this.state.selectedFile.name);
                  fd.append('idUser',NEWid)
                  console.log(this.state.selectedFile)
                  console.log(stringifyFormData(fd))
                  await fetch('https://homedots.us/beddot/public/uploadPhoto', {
                    method: 'POST',
                    body: fd,
                  })
                  .then(res=>res.json())
                  .then(json=>{
                    resp=json.result
                  })
                  this.setState({
                    photo: resp.path,
                  })

                  
                  toast.success("Successful New User") 
              }
          }


        }
        
    }
    
  }

  fileSelecterHandler = async(e) => {
    e.preventDefault();
    await this.setState({
      selectedFile : e.target.files[0]
    })
    //console.log(this.state.selectedFile)
  
  }
  

  render() {
    var { isLoaded , items, profiles} = this.state;
    
    var id_facility = [];
    var name_facility = [];
    var id_profile = [];
    var name_profile = [];
    var adding = [];
    var addingP = [];

    if(isLoaded){
      var total_facilities=items.length;
        for(var i=0;i<total_facilities;i++){
          id_facility[i]=items[i]["id_facility"];
          name_facility[i]=items[i]["name_facility"];
          adding.push(
          <option id={"drop"+i} key={"drop"+i} name={"drop"+i} value={id_facility[i]}>{name_facility[i]}</option>
          );
        }
      var total_profiles=profiles.length;      
      for(var i=0;i<total_profiles;i++){
        id_profile[i]=profiles[i]["idProfile"];
        name_profile[i]=profiles[i]["nameProfile"];
        addingP.push(
          <option id={"dropP"+i} key={"dropP"+i} name={"dropP"+i} value={id_profile[i]}>{name_profile[i]}</option>
        );
      }

    }

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="New System User"
                content={
                  <form id="newform">
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                      properties={[
                        {
                          id: "fname",
                          label: "First Name *",
                          type: "text",
                          bsClass: "form-control",  
                          onChange: this.handleChange,                        
                        },
                        {
                          id: "lname",
                          label: "Last name *",
                          type: "text",
                          bsClass: "form-control",
                          onChange: this.handleChange, 
                          // placeholder: "Username",
                          // defaultValue: "michael23"
                        },
                        {
                          id: "email",
                          label: "Email address *",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          onChange: this.handleChange,
                        },
                        {
                          id: "phone",
                          label: "Phone *",
                          type: "phone",
                          bsClass: "form-control",
                          onChange: this.handleChange,
                          //placeholder: "Email"
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          id: "uname",
                          label: "Username *",
                          type: "text",
                          bsClass: "form-control",
                          onChange: this.handleChange, 
                          //placeholder: "First name",
                          //defaultValue: "Mike"
                        },
                        {
                          id: "pass1",
                          label: "Password *",
                          type: "password",
                          bsClass: "form-control",
                          //placeholder: "Last name",
                          //defaultValue: "Andrew"
                        },
                        {
                          id: "pass2",
                          label: "Repeat password *",
                          type: "password",
                          bsClass: "form-control",
                          //placeholder: "Last name",
                          //defaultValue: "Andrew"
                        }
                      ]}
                    />                    
                    <Row>
                      <Col md={12}>
                      <ControlLabel>Facility *</ControlLabel>
                         <select id="Select1" key="Select1" style={{ margin: 20 }} >
                           {adding}                  
                        </select>
                        <ControlLabel>User Profile (Permission) *</ControlLabel>
                         <select id="Select2" key="Select2" style={{ margin: 20 }} onChange={this.updateCurrent}>
                           {addingP}                  
                        </select>
                      </Col>                      
                    </Row>
                    <Row>
                    <Col md={12}>
                    <ControlLabel>Upload Picture</ControlLabel>
                    {/* <Button bsStyle="info"  fill type="button" style={{ margin: 20 }}>Search</Button> */}
                    <input type="file" onChange={this.fileSelecterHandler}></input>
                      </Col>
                    </Row>
                    <Button bsStyle="info" pullRight fill type="button" onClick={this.saveUser}>
                      Create User
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={this.state.photo}
                name={this.state.name+" "+this.state.last}
                userName={this.state.username}
                description={
                  <span>
                      Profile: {this.state.current}  <br />
                      Phone: {this.state.phone} <br />
                      Email: {this.state.email}
                    </span>
                }
                // socials={
                //   <div>
                //     <Button simple>
                //       <i className="fa fa-facebook-square" />
                //     </Button>
                //     <Button simple>
                //       <i className="fa fa-twitter" />
                //     </Button>
                //     <Button simple>
                //       <i className="fa fa-google-plus-square" />
                //     </Button>
                //   </div>
                // }
              />
              
            </Col>
          </Row>
        </Grid>
        <div> <ToastContainer /> </div>
      </div>
    );
  }
}

export default UserSystem;

function stringifyFormData(fd) {
  const data = {};
	for (let key of fd.keys()) {
  	data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}
