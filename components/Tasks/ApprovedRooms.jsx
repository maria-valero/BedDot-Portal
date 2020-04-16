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
import { ToastContainer, toast } from 'react-toastify';
import {ControlLabel,Button} from "react-bootstrap";
import {AddRoom} from "components/Tasks/addRoom.jsx";










export class ApprovedRooms extends Component {

  //*****CONSTRUCTOR */
  constructor(props){
    //alert("-----");
    super(props);
    this.state={      
      Fitems:[],
      isLoaded:false, 
      id_to_show:-1     
    }
    
  }
  //****COMPONENTS FUNCTIONS */
  componentDidMount(){    
    this.getFacilities();       
  }

  //*** HANDLE OPTIONS */

  handleChangeFacility = async() =>{
    var id=document.querySelector('#Select1').value;  
    //this.getUsers(id_facility);
    this.setState({
      id_to_show:id,
    })
  }

  handleOpenAddRoomModal = async() =>{
    var id=document.querySelector('#Select1').value;      
    this.setState({
      id_to_show:id,
    })
    //console.log(this.state.Fitems,this.state.id_to_show)
  }


  //***FUNCTION FOR END-POINTS */

  /***GET FACILITIES (TO BRING ALL THE AVAILABLE FACILITIES) */
  getFacilities = async() => {
    await fetch('https://homedots.us/beddot/public/getFacilities')
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        Fitems:json.result,    
      })           
    })
  }

  addNewRoom = async(e) => {
      var resp;
      var FACIL = this.state.Fitems[this.state.id_to_show]["id_facility"]
      var NEMAIL = document.getElementById("nroemails").value
      var NPHONE = document.getElementById("nrophones").value
      if(NEMAIL==0 || NPHONE==0){
        if(NEMAIL == 0) toast.error("Please insert at least one email.")
        if(NPHONE == 0) toast.error("Please insert at least one phone.")
      }else{
        if(document.getElementById("Rname").value==''){
          toast.error("Please add a name for the room.")
        }
        else{
          var nro=0;
          var nph=0;
          for(var i=0;i<NEMAIL;i++){
            if(document.getElementById("inputemail-"+FACIL+"-"+i).value=="" || document.getElementById("inputnick-"+FACIL+"-"+i).value=="")
                nro=1;
          }
          for(var i=0;i<NPHONE;i++){
            if(document.getElementById("inputphone-"+FACIL+"-"+i).value=="" || document.getElementById("inputnickphone-"+FACIL+"-"+i).value=="")
                nph=1;
          }
          if(nro==1 || nph==1){
            toast.error("Please fill all emails/phones correctly.")
          }
          else{
              //call endpoints
              var x = document.querySelector('#SelectWIFI').value;             
              const dataClient = new FormData();
              dataClient.append('nameClient',document.getElementById("Rname").value)
              dataClient.append('phoneClient',document.getElementById("inputphone-"+FACIL+"-"+0).value)
              dataClient.append('mailClient',document.getElementById("inputemail-"+FACIL+"-"+0).value)
              dataClient.append('id_wifi',x);
              //console.log(stringifyFormData(dataClient))
              //CALL END POINT OF ADD CLIENTS => This endpoint should return the ID of the Client
              await fetch('https://homedots.us/beddot/public/addRoom', {
                  method: 'POST',
                  body: dataClient,
              })
              .then(res=>res.json())
              .then(json=>{
                resp=json.result
              })
              
              var idRoom = resp;              
              const dataFacClient = new FormData();
              dataFacClient.append("id_facility",FACIL)
              dataFacClient.append("id_client",idRoom)
              //console.log(stringifyFormData(dataFacClient))
              await fetch('https://homedots.us/beddot/public/linkFacilityRoom', {
                  method: 'POST',
                  body: dataFacClient,
              })
              //CALL END POINT ADD FACILITY_ClIENT 
              const dataEmail = new FormData();
              dataEmail.append("id_client",idRoom)
              dataEmail.append("nro_emails",NEMAIL)
              for(var i=0;i<NEMAIL;i++){
                dataEmail.append("Email"+i,document.getElementById("inputemail-"+FACIL+"-"+i).value)
                dataEmail.append("Nickname"+i,document.getElementById("inputnick-"+FACIL+"-"+i).value)
                dataEmail.append("Status"+i,"1")
              }              
              //console.log(stringifyFormData(dataEmail))
              //CALL END POINT ADD EMAILS
              await fetch('https://homedots.us/beddot/public/addEmails', {
                  method: 'POST',
                  body: dataEmail,
              })
              const dataPhones = new FormData();
              dataPhones.append("id_client",idRoom)
              dataPhones.append("nro_phones",NPHONE)
              for(var i=0;i<NPHONE;i++){
                dataPhones.append("Phone"+i,document.getElementById("inputphone-"+FACIL+"-"+i).value)
                dataPhones.append("Nickname"+i,document.getElementById("inputnickphone-"+FACIL+"-"+i).value)
                dataPhones.append("idCarrier"+i,document.getElementById("carrier-"+FACIL+"-"+i).value)
                dataPhones.append("Status"+i,"1")
              }              
              //console.log(stringifyFormData(dataPhones))
              await fetch('https://homedots.us/beddot/public/addPhones', {
                  method: 'POST',
                  body: dataPhones,
              })
              //CALL END POINT ADD PHONES
              toast.success("Room Added.")
              //HERE I NEED TO CHANGE STATUS FOR REFRESH
              
              
              
          }
        }
        

      }
  }
  

  render() {

      //****TO ADD FACILITIES TO THE SELECT  */
      var { isLoaded , Fitems} = this.state;
      var adding = [];
      if(isLoaded){
        var total_facilities=Fitems.length;
        var id_facility = [];
        var name_facility = [];
        for(var i=0;i<total_facilities;i++){
          id_facility[i]=Fitems[i]["id_facility"];
          name_facility[i]=Fitems[i]["name_facility"];
          adding.push(
          <option id={"drop"+i} key={"drop"+i} name={"drop"+i} value={i}>{name_facility[i]}</option>
          );
        }
        
      }

      //****MODAL TO ADD A NEW ROOM */
      if(isLoaded && this.state.id_to_show!=-1){
          var printername = name_facility[this.state.id_to_show];       
          var newRoomModal = [];
          newRoomModal.push(
            <div className="modal fade" id={"modalAddRoom"+this.state.id_to_show} key={"modalAddRoom"+this.state.id_to_show} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div id={"m1-"+this.state.id_to_show} key={"m1-"+this.state.id_to_show} className="modal-dialog modal-dialog-centered" role="document">
                <div id={"m2-"+this.state.id_to_show} key={"m2-"+this.state.id_to_show} className="modal-content">
                  <div id={"m3-"+this.state.id_to_show} key={"m3-"+this.state.id_to_show} className="modal-header">
                   
                  <h4 id={"h4-"+this.state.id_to_show} key={"h4-"+this.state.id_to_show} className="modal-title" id="exampleModalLongTitle">Add room to facility: {printername}</h4>                
                  </div>
                  <div id={"m4-"+this.state.id_to_show} key={"m4-"+this.state.id_to_show} className="modal-body">
                    <AddRoom idFacility={id_facility[this.state.id_to_show]}/>
                  </div>
                  <div  id={"m5-"+this.state.id_to_show} key={"m5-"+this.state.id_to_show} className="modal-footer">
                    <Button id={'buttonRRoom-'+this.state.id_to_show} key={'buttonRRoom-'+this.state.id_to_show} bsStyle="info"   type="button" className="btn btn-secondary" data-dismiss="modal" >
                        Close
                    </Button>
                    <Button id={'buttonAddRoom-'+this.state.id_to_show} key={'buttonAddRoom-'+this.state.id_to_show} bsStyle="info"  type="button" className="btn btn-secondary" onClick={this.addNewRoom} >
                        Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
      }

      //****RENDER FUNCTION */
      return(
        <div className="content">
        <table>
          <tbody>
            <tr>
              <td><ControlLabel>Please select the facility</ControlLabel></td>              
              <td>
                  <select id="Select1" key="Select1" name="Select1"  style={{ margin: 20 }} onChange={this.handleChangeFacility}>
                  {adding}          
                  </select>
              </td>
              <td><ControlLabel>Add Room</ControlLabel></td>
              <td>              
                <Button style={{margin:20}} bsStyle="info" id="buttonAddRoom" key="buttonAddRoom" name="buttonAddRoom" data-toggle="modal" data-target={"#modalAddRoom"+this.state.id_to_show} onClick={this.handleOpenAddRoomModal}>
                  <i className="fa fa-plus" aria-hidden="true" />
                </Button>
              </td>
          </tr>
          </tbody>
        </table>
        {newRoomModal}        
        <div> <ToastContainer /> </div>
      </div>      
      
      );
    
    
      
    
    
  }
  
}


export default ApprovedRooms;

function stringifyFormData(fd) {
  const data = {};
	for (let key of fd.keys()) {
  	data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}
