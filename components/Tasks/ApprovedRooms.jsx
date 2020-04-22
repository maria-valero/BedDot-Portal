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
import {ControlLabel,Button,Grid,Row,Col,Table, ToastHeader,Switch, Modal} from "react-bootstrap";
import {AddRoom} from "components/Tasks/addRoom.jsx";
import {UpdateRoom} from "components/Tasks/updateRoom.jsx";
import Card from "components/Card/Card.jsx";
import { StatsRoom } from "components/StatsCard/StatsRoom.jsx";
//import {Modal, ModalBody, ModalHeader} from 'reactstrap';









export class ApprovedRooms extends Component {

  //*****CONSTRUCTOR */
  constructor(props){
    //alert("-----");
    super(props);
    this.state={      
      Fitems:[],
      isLoaded:false, 
      id_to_show:-1,
      RoomInfo:[], 
      cnbutton : "btn btn-secondary",
      cnbuttonUpdate : "btn btn-primary",
      id_to_room:-1, 
      openmodal:false,
      openmodalmodify:false,
      // newUpdateModal: <span>hola mundo</span>
       
    }
    
  }
  //****COMPONENTS FUNCTIONS */
  componentDidMount(){    
    this.getFacilities();   
       
  }
  componentWillMount(){

  }

  //*** HANDLE OPTIONS */

  handleChangeFacility = async() =>{
    var id=document.querySelector('#Select1').value;  
    await this.setState({
      id_to_show:id,
    })
    this.getRoomsFacility()
  }

  handleOpenAddRoomModal = async() =>{
    var id=document.querySelector('#Select1').value;      
    this.setState({
      id_to_show:id,
      cnbutton: "btn btn-secondary",
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
        id_to_show:0,   
      })           
    })
    console.log("idF:"+this.state.id_to_show)
    this.getRoomsFacility(); 
  }

  getRoomsFacility  = async() => {
     var id_f = this.state.Fitems[this.state.id_to_show]["id_facility"]; 
     console.log() 
     await fetch('https://homedots.us/beddot/public/getRoom/'+id_f)
    .then(res=>res.json())
    .then(json=>{
     this.setState({
        RoomInfo : json.result, 
        //id_to_room:document.querySelector('#Select1').value,   
      })           
    })
    console.log("Select1: "+document.querySelector('#Select1').value);
    //console.log(this.state.RoomInfo)
  }

  handleUpdateRoom = (e,v) => {
    // Variable e contains the position of the array of the room to modigy
    //console.log("HOLAAAAAAA"+this.state.RoomInfo[e]["nameRoom"])
    
    if(v==0) {
    this.setState({
        id_to_room:e,
        openmodal: true
      })
  }else{
     this.setState({
        id_to_room:e,
        openmodalmodify:true
     })
  }

  }

  closemodal = async(e) =>{
    console.log("Entro close")
    this.setState({
      id_to_room:-1,
      openmodal:false,
    })
    this.setState({                
      cnbuttonUpdate: "btn btn-primary",
    })
  }
  closemodalmodify = async(e) =>{
    
    this.setState({
      id_to_room:-1,
      openmodalmodify:false,
    })
    this.setState({                
      cnbuttonUpdate: "btn btn-primary",
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
              this.getRoomsFacility();
              this.setState({                
                cnbutton: "hidden",
              })
              //HERE I NEED TO CHANGE STATUS FOR REFRESH
              
              
              
          }
        }
        

      }
  }

  updatetheRoom = async(e) => {
    var resp;
    
    var FACIL = this.state.Fitems[this.state.id_to_show]["id_facility"]
    var NEMAIL = document.getElementById("nroemails").value
    var NPHONE = document.getElementById("nrophones").value
    var posID = document.getElementById("roomID").value
    console.log("ROOM: ",document.getElementById("Rname"+posID).value)
    if(document.getElementById("Rname"+posID).value==''){
      toast.error("Please add a name for the room.")
    }
    else{
      var nem = 0;
      var nph = 0;
      var nemN = 0;
      var nphN = 0;
      
      for(var i=0;i<this.state.RoomInfo[posID]["nroemail"];i++){
        
        if(document.getElementById("inputemail-"+FACIL+"-"+i).value=="" || document.getElementById("inputnick-"+FACIL+"-"+i).value=="")
            nem = 1;
      }for(var i=0;i<this.state.RoomInfo[posID]["nrophones"];i++){
        
        if(document.getElementById("inputphone-"+FACIL+"-"+i).value=="" || document.getElementById("inputnickphone-"+FACIL+"-"+i).value=="")
            nph = 1;
      }
      for(var i=0;i<NEMAIL;i++){
        if(document.getElementById("inputemailNEW-"+FACIL+"-"+i).value=="" || document.getElementById("inputnickNEW-"+FACIL+"-"+i).value=="")
            nemN=1;
      } 
      for(var i=0;i<NPHONE;i++){
        if(document.getElementById("inputphoneNEW-"+FACIL+"-"+i).value=="" || document.getElementById("inputnickphoneNEW-"+FACIL+"-"+i).value=="")
            nphN =1;
      }  
        if(nem==1 || nph==1 || nemN==1 || nphN==1){
            toast.error("Please fill all the fields.")
        }
        else{
          const updateClientData = new FormData();
          updateClientData.append("id_facility",FACIL)
          updateClientData.append("idRoom",this.state.RoomInfo[posID]["idClient"])
          updateClientData.append("idWifi",document.getElementById("SelectWIFI"+posID).value)
          updateClientData.append("nroOldEmail",this.state.RoomInfo[posID]["nroemail"])
          updateClientData.append("nroOldPhone",this.state.RoomInfo[posID]["nrophones"])
          updateClientData.append("name",document.getElementById("Rname"+posID).value)
          for(var i=0;i<this.state.RoomInfo[posID]["nroemail"];i++){
            updateClientData.append("idemail"+i,document.getElementById("inputidemail-"+FACIL+"-"+i).value)
            updateClientData.append("email"+i,document.getElementById("inputemail-"+FACIL+"-"+i).value)
            updateClientData.append("emailnick"+i,document.getElementById("inputnick-"+FACIL+"-"+i).value)
          }
          for(var i=0;i<this.state.RoomInfo[posID]["nrophones"];i++){
            updateClientData.append("idphone"+i,document.getElementById("inputidphone-"+FACIL+"-"+i).value)
            updateClientData.append("phone"+i,document.getElementById("inputphone-"+FACIL+"-"+i).value)
            updateClientData.append("phonenick"+i,document.getElementById("inputnickphone-"+FACIL+"-"+i).value)
            updateClientData.append("carrier"+i,document.getElementById("carrier-"+FACIL+"-"+i).value)
          }
          //console.log(stringifyFormData(updateClientData))
          //call end-point update Room
          await fetch('https://homedots.us/beddot/public/updateRoom', {
                  method: 'POST',
                  body: updateClientData,
            })

          const dataEmail = new FormData();
          dataEmail.append("id_client",this.state.RoomInfo[posID]["idClient"])
          dataEmail.append("nro_emails",NEMAIL)
          
          for(var i=0;i<NEMAIL;i++){
            dataEmail.append("Email"+i,document.getElementById("inputemailNEW-"+FACIL+"-"+i).value)
            dataEmail.append("Nickname"+i,document.getElementById("inputnickNEW-"+FACIL+"-"+i).value)
            dataEmail.append("Status"+i,"1")
          }  
          //console.log(stringifyFormData(dataEmail))
          //call end-point addEmails
          await fetch('https://homedots.us/beddot/public/addEmails', {
                  method: 'POST',
                  body: dataEmail,
              })


          const dataPhones = new FormData();
          dataPhones.append("id_client",this.state.RoomInfo[posID]["idClient"])
          dataPhones.append("nro_phones",NPHONE)
          for(var i=0;i<NPHONE;i++){
            dataPhones.append("Phone"+i,document.getElementById("inputphoneNEW-"+FACIL+"-"+i).value)
            dataPhones.append("Nickname"+i,document.getElementById("inputnickphoneNEW-"+FACIL+"-"+i).value)
            dataPhones.append("idCarrier"+i,document.getElementById("carrierNEW-"+FACIL+"-"+i).value)
            dataPhones.append("Status"+i,"1")
          }    
          //console.log(stringifyFormData(dataPhones))
          //call end-point addPhones

          await fetch('https://homedots.us/beddot/public/addPhones', {
                  method: 'POST',
                  body: dataPhones,
              })

          toast.success("Room Updated.")
              this.getRoomsFacility();
              this.setState({                
                cnbuttonUpdate: "hidden",
              })
        }
      }
      
    
    
  }

  
  

  render() {

      //****TO ADD FACILITIES TO THE SELECT  */
      var { isLoaded , Fitems, RoomInfo, newUpdateModal} = this.state;
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
      //if(isLoaded && this.state.id_to_show!=-1){
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
                    <Button id={'buttonRRoom-'+this.state.id_to_show} key={'buttonRRoom-'+this.state.id_to_show} bsStyle="info"   type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closemodal} >
                        Close
                    </Button>
                    <Button id={'buttonAddRoom-'+this.state.id_to_show} key={'buttonAddRoom-'+this.state.id_to_show} bsStyle="info"  type="button" className={this.state.cnbutton} onClick={this.addNewRoom} >
                        Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
      }

      //****Fill the table of rooms */
      var idClient = [];
      var nameRoom = [];
      var nrowifi = 0;
      var ssid = [];
      var pass = [];
      var print = "";
      var fillupdatemodal=[];
      var fillmodifymodal=[];

      if(isLoaded){
        var roomstable = [];
        if(RoomInfo.length>0){
           for(i=0;i<RoomInfo.length;i++){
                print = "";
                idClient[i]     =   RoomInfo[i]["idClient"]
                nameRoom[i]     =   RoomInfo[i]["nameRoom"]
                nrowifi         =   RoomInfo[i]["nrowifi"]
                if(nrowifi == 0){
                    print = "NO WIFI - Update";
                    ssid[i] = ""
                    pass[i] = ""
                }else{
                    ssid[i] = RoomInfo[i]["ssid"]
                    pass[i] = RoomInfo[i]["password"]
                    print = "SSID: "+ssid[i];
                }                

                roomstable.push(
                  
                  <Col lg={3} sm={2} key={"nuevo"+i}>
                      <StatsRoom                
                        bigIcon={<i className="pe-7s-users text-warning" />}
                        statsValue={nameRoom[i]}
                        statsSsid = {print}
                        statsIcon={<i className="fa fa-refresh" />}                      
                        statsRoomId = {i}
                        statsElement = {this.state.id_to_room}
                        statsErase = {0}
                        onClick = {this.handleUpdateRoom}
                        
                      />
                    </Col>
                 
                )


           }

        }
        else{
          roomstable.push(
            <h5 id = {"h"+this.state.id_to_show} key= {"h"+this.state.id_to_show}>No registered rooms for this facility.</h5>
          )
        }
  
      }
      if(this.state.openmodal){
      
        var n = this.state.id_to_room;
       
        fillupdatemodal.push(        
          <UpdateRoom idFacility={id_facility[this.state.id_to_show]} data={RoomInfo[n]} idRoom={this.state.id_to_room} key={"updating-"+n}/>          
        )
      }
      if(this.state.openmodalmodify){
      
        var n = this.state.id_to_room;
       
        fillmodifymodal.push(        
                 
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
       
        <div key="container">
         {roomstable}    
        </div>
        <div className="content" >
        
        <Modal show={this.state.openmodal} onHide={this.closemodal}>
          <Modal.Header closeButton>
            <h4 id={"hu4-"+this.state.id_to_room} key={"hu4-"+this.state.id_to_room} className="modal-title" id="exampleModalLongTitle">Update Room: {this.state.RoomInfo[this.state.id_to_room] ? this.state.RoomInfo[this.state.id_to_room]["nameRoom"] : ''}</h4>                

          </Modal.Header>
          <Modal.Body>{fillupdatemodal}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" bsStyle="info" onClick={this.closemodal}>
              Close
            </Button>
            <Button variant="primary" bsStyle="info" onClick={this.updatetheRoom} className={this.state.cnbuttonUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.openmodalmodify} onHide={this.closemodalmodify}>
          <Modal.Header closeButton>
            <h4 id={"hu4-"+this.state.id_to_room} key={"hu4-"+this.state.id_to_room} className="modal-title" id="exampleModalLongTitle">Update Room: {this.state.RoomInfo[this.state.id_to_room] ? this.state.RoomInfo[this.state.id_to_room]["nameRoom"] : ''}</h4>                

          </Modal.Header>
          <Modal.Body>{fillmodifymodal}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" bsStyle="info" onClick={this.closemodalmodify}>
              Close
            </Button>
            <Button variant="primary" bsStyle="info" >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        
        
        <Grid fluid>
          <Row>
            <Col md={12}>
             
            </Col>
          </Row>
        </Grid>
        {/* {cardfacility}        
        {message} */}
       
        <div> <ToastContainer /> </div>
      </div>

        
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
