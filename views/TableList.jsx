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
import Iframe from 'react-iframe'
import { ToastContainer, toast } from 'react-toastify';
import {
  ControlLabel} from "react-bootstrap";

class TableList extends Component {

  constructor(props){
    //alert("-----");
    super(props);
    this.state={
      items:[],
      isLoaded:false,
      dash:[],   
      id:[],      
    }
    
  }
  componentDidMount(){    
    this.getFacilities();
    //var id_facility=document.querySelector('#Select1').value;
    
    
  }
  getFacilities = async() => {
    await fetch('https://homedots.us/beddot/public/getFacilities')
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        items:json.result,    
      })      
      console.log(this.state);
    })
    var x = document.querySelector('#Select1').value;
    this.setState({
      id:x
    })

  }

  handleDrop = async(e) =>{
    var id_facility=document.querySelector('#Select1').value;  
    console.log(id_facility);
    toast.info("Charging dashboard... Please wait")
    await fetch('https://homedots.us/beddot/public/getDashboarname/'+id_facility)
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        dash:json.result,          
        id:id_facility,
        
      })      
      console.log(this.state);
    })

    
    // this.setState({
    //   isLoaded:true,
    //   items:[],        
    // })
    // var id_facility=document.querySelector('#Select1').value;  
    // fetch('https://homedots.us/beddot/public/getUnitClientFacility/'+id_facility)
    // .then(res=>res.json())
    // .then(json=>{
    //   this.setState({
    //     isLoaded:true,
    //     items:json.result,        
    //   })      
    //   console.log(this.state);
    // })
  };

  render(){

    var { isLoaded , items} = this.state;
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

        var urlX="";
        var framepush=[];
        if(this.state.id!=""){
            urlX="http://18.222.223.195:3000/d/"+this.state.id+"/"+this.state.dash+"?orgId=1&refresh=5s"
            framepush.push(
              <Iframe id="frame" key="frame" url={urlX}
              width="100%"
              height="1000"
              id="myId"
              className="embed-responsive-item"
              display="initial"
              position="relative"
              X-Frame-Options="deny"
              />
            )
          }   
      }
      
    

    return(
      <div className="embed-responsive-item">
        <table>
          <tbody>
            <tr>
            <td><ControlLabel style={{margin:20}}>Please select the facility</ControlLabel></td> 
              <td>
                  <select id="Select1" key="Select1" name="Select1" style={{ margin: 20 }} onChange={this.handleDrop}>
                  {adding}          
                  </select>
              </td>
            
          </tr>
          </tbody>
        </table>
        {/* <Iframe url="http://18.222.223.195:3000/d/y1ZuEvFWz/summary?orgId=1&refresh=5sp" */}
        {framepush}
        {/* <Iframe url={urlX}
        width="100%"
        height="1000"
        id="myId"
        className="embed-responsive-item"
        display="initial"
        position="relative"
        X-Frame-Options="deny"
        /> */}
        <div> <ToastContainer /> </div>
      </div>
    )
  }
}
export default TableList;
///d/y1ZuEvFWz/summary?orgId=1&refresh=5s