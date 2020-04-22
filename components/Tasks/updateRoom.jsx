import React, { Component } from "react";
import {ControlLabel,Button,Col,Row,Modal} from "react-bootstrap";
//import update from 'immutability-helper';


export class UpdateRoom extends Component {
    
    constructor(props){
        //alert("-----");
        super(props);
        this.state={
            wifis: [],
            isLoaded : false,
            nroemail : 0,
            nrophone: 0,
            idselected:-1,
            carriers: [],
            phonecarriers:[],
            nroemail2 : 0,
            nrophone2 :0,
            openmodal : false,
            targetremoval : -1,
            
         } 
    }
    //****COMPONENTS FUNCTIONS */
    componentDidMount(){   
        
       this.getWifi();  
       this.getCarrier();
         
       if(this.props.data["nrowifi"]>0){
            var a = this.props.data["idWifi"] 
            this.setState({
                idselected : a
            })

       }
       if(this.props.data["nroemail"]>0){
            var ne = this.props.data["nroemail"]
            this.setState({
                nroemail : ne
            })
       }
       if(this.props.data["nrophones"]>0){
            var ne = this.props.data["nrophones"]
            this.setState({
                nrophone : ne
            })
        console.log("NNNN"+this.state.nroemail2,this.state.nrophone2) 
        document.getElementById("nroemails").value=0;
        document.getElementById("nrophones").value=0;
        document.getElementById("roomID").value=this.props.idRoom;
    
       }
       
       
       //this.handleAddEmail();
       //this.handleAddPhone();
       
       console.log(this.props.data) //this.props.data has the information of the room to modify
       //console.log(this.state.phonecarriers)
    }

    changeSelect = (event) => {   
        //console.log("onchange") 
        const target = event.target;
        const value = target.value;
        const name = target.name;  
        //console.log(name)
        //console.log(value)
        this.setState({        
            idselected:value
            
        });
        //console.log(value)
        
      };

      changeCarrier =  (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;  
            
        this.setState({
            [name] : value,
            value :  value,
        })
        
        var a = event.target.id;
        a = a.split("-")
        console.log(a)
        this.props.data["idcarrier"+a[2]] = value;
    
       
      }

    getWifi = async(e) => {
        
        await fetch('https://homedots.us/beddot/public/queryWifi/'+this.props.idFacility)
        .then(res=>res.json())
        .then(json=>{
        this.setState({            
            wifis:json.result, 
            isLoaded:true,   
        })      
        //console.log(this.state);
        })  
        if(this.state.idselected==-1){
            var newid = this.state.wifis[0]["idWifi"];
            this.setState({
                idselected : newid,
            })
        }
        
    }

    getCarrier = async(e) => {
        await fetch('https://homedots.us/beddot/public/getCarrier')
        .then(res=>res.json())
        .then(json=>{
        this.setState({            
            carriers:json.result, 
            isLoaded:true,   
        })      
        //console.log(this.state.carriers);
        })    
    }


    handleAddEmail = async(e) => {
        var nemail = this.state.nroemail2 + 1;
        await this.setState({
            nroemail2 : nemail,
        })
        //console.log("ENTRO AQUI - nroemail" + this.state.nroemail)
        document.getElementById("nroemails").value=nemail
        //console.log("input "+document.getElementById("nroemails").value)
    }
    handleRemoveEmail = async(e) => {
        var nemail = this.state.nroemail2 - 1;
        await this.setState({
            nroemail2 : nemail,
        })
        document.getElementById("nroemails").value=nemail
    }
    handleAddPhone = async(e) => {
        var nemail = this.state.nrophone2 + 1;
        await this.setState({
            nrophone2 : nemail,
        })
        document.getElementById("nrophones").value=nemail
        
    }
    handleRemovePhone = async(e) => {
        var nemail = this.state.nrophone2 - 1;
        await this.setState({
            nrophone2 : nemail,
        })
        document.getElementById("nrophones").value=nemail
    }
    handleRemoval= async(e) => {
        var a = e.target.id
        this.setState({   
            targetremoval : a,
            openmodal:true,
          })
    }

    closemodal = async(e) =>{
        var a = -1;
        this.setState({    
          targetremoval:a,     
          openmodal:false,
        })
      }
    
     removeEmailDB = async(e) =>{
        var t = this.state.targetremoval;
        t = t.split("-")
        var emaildelete = t[1];
        var a = -1;
        console.log(emaildelete)
        
        // await fetch('https://homedots.us/beddot/public/deleteEmail/'+emaildelete)
        // .then(res=>res.json())
        // .then(json=>{
        // this.setState({            
        //     targetremoval:a,     
        //     openmodal:false,
        // })
        // })  
        




    //     this.getWifi();  
    //     this.getCarrier();
         
    //    if(this.props.data["nrowifi"]>0){
    //         var a = this.props.data["idWifi"] 
    //         this.setState({
    //             idselected : a
    //         })

    //    }
    //    if(this.props.data["nroemail"]>0){
    //         var ne = this.props.data["nroemail"]
    //         this.setState({
    //             nroemail : ne
    //         })
    //    }
    //    if(this.props.data["nrophones"]>0){
    //         var ne = this.props.data["nrophones"]
    //         this.setState({
    //             nrophone : ne
    //         })
    //    }

        
        
    }


    
    render(){

        var { isLoaded , wifis, carriers} = this.state;
        var id_wifi = [];
        var ssid = [];
        var password = [];
        var adding = [];
        var addemail = [];
        var addphone = [];
        var addemailNEW = [];
        var addphoneNEW = [];
        var idCarrier = [];
        var nameCarrier = [];
        var adding2 = [];

        if(isLoaded){
            /*** Fill select with the Wifis of that moment */                    
            for(var i=0;i<wifis.length;i++){
                id_wifi[i]=wifis[i]["idWifi"];
                ssid[i]=wifis[i]["SSID"];
                password[i]=wifis[i]["password"];
                adding.push(
                    <option id={"wifiN-"+i+"-"+this.props.idFacility} key={"wifiN-"+i+"-"+this.props.idFacility} name={"wifiN-"+i+"-"+this.props.idFacility} value={id_wifi[i]}>{ssid[i]}</option>
                );
            }

            //*** Fill carriers */
            var new3 = this.props.idFacility;
            
            if(carriers.length>0){
                for(var i=0;i<carriers.length;i++){
                    idCarrier[i]=carriers[i]["idCarrier"];
                    nameCarrier[i]=carriers[i]["carrierName"]
                    adding2.push(
                        <option id={"drop"+new3+"-"+i} key={"drop"+new3+"-"+i} name={"drop"+new3+"-"+i} value={idCarrier[i]}>{nameCarrier[i]}</option>
                    )
                }
            }

            /*** Fill the emails  */
            
            if(this.state.nroemail>0){
                for(var i=0;i<this.state.nroemail;i++){
                    
                        addemail.push(
                            <div id={"divemail-"+new3+"-"+i} key={"divmail-"+new3+"-"+i} name={"divmail-"+new3+"-"+i}>                                              
                                <div id={"divemailA-"+new3+"-"+i} key={"divmailA-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5 }}>Email:</ControlLabel>
                                    <input type="email" id={"inputemail-"+new3+"-"+i} key={"inputemail-"+new3+"-"+i} name={"inputemail-"+new3+"-"+i} defaultValue={this.props.data["email"+i]}></input>
                                </div>
                                <div id={"divemailB-"+new3+"-"+i} key={"divmailB-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5}}>Name:</ControlLabel>
                                    <input  id={"inputnick-"+new3+"-"+i} key={"inputnick-"+new3+"-"+i} name={"inputnick-"+new3+"-"+i} defaultValue={this.props.data["nickname-email"+i]}></input>                        
                                    <input style={{visibility: 'hidden'}} id={"inputidemail-"+new3+"-"+i} key={"inputidemail-"+new3+"-"+i} defaultValue={this.props.data["idEmail"+i]}></input>
                                
                                    {/* <Button id={"ButtonUpdate-"+this.props.data["idEmail"+i]} bsStyle="info" bsSize="xs" onClick={this.handleRemoval}>
                                        <i id={"ButtonUpdate-"+this.props.data["idEmail"+i]} className="fa fa-times" aria-hidden="true" />
                                    </Button>  */}
                                </div>        
                                {/* <Modal id={"Modal-"+this.props.data["idEmail"+i]} show={this.state.openmodal} onHide={this.closemodal}>                                
                                <Modal.Body id={"ModalB-"+this.props.data["idEmail"+i]}>Are you sure you want to remove this email? </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" bsStyle="info" onClick={this.closemodal}>
                                    No
                                    </Button>
                                    <Button id={i} variant="primary" bsStyle="info" onClick={this.removeEmailDB}>
                                    Yes
                                    </Button>
                                </Modal.Footer>
                                </Modal>                                                                                                             */}
                            </div>  
                            )

                    
                    
                }


            }

            // For new email
            if(this.state.nroemail2>0){
                for(var i=0;i<this.state.nroemail2;i++){
                    if(i==this.state.nroemail2-1)
                    {
                        addemailNEW.push(
                            <div id={"divemail-"+new3+"-"+i} key={"divmail-"+new3+"-"+i} name={"divmail-"+new3+"-"+i}>                                              
                                <div id={"divemailA-"+new3+"-"+i} key={"divmailA-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5 }}>Email:</ControlLabel>
                                    <input type="email" id={"inputemailNEW-"+new3+"-"+i} key={"inputemailNEW-"+new3+"-"+i} name={"inputemailNEW-"+new3+"-"+i} ></input>
                                </div>
                                <div id={"divemailB-"+new3+"-"+i} key={"divmailB-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5}}>Name:</ControlLabel>
                                    <input id={"inputnickNEW-"+new3+"-"+i} key={"inputnickNEW-"+new3+"-"+i} name={"inputnickNEW-"+new3+"-"+i} ></input>                        
                                
                                    <Button  bsStyle="info" bsSize="xs" onClick={this.handleRemoveEmail}>
                                        <i className="fa fa-times" aria-hidden="true" />
                                    </Button> 
                                </div>        
                                                                                                                                              
                            </div>  
                            )

                    }
                    else{
                        addemailNEW.push(
                            <div id={"divemail-"+new3+"-"+i} key={"divmail-"+new3+"-"+i} name={"divmail-"+new3+"-"+i}>          
                                <div id={"divemailA-"+new3+"-"+i} key={"divmailA-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5 }}>Email:</ControlLabel>
                                    <input type="email" id={"inputemailNEW-"+new3+"-"+i} key={"inputemailNEW-"+new3+"-"+i} name={"inputemailNEW-"+new3+"-"+i} ></input>
                                </div>
                                <div id={"divemailB-"+new3+"-"+i} key={"divmailB-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5}}>Name:</ControlLabel>
                                    <input id={"inputnickNEW-"+new3+"-"+i} key={"inputnickNEW-"+new3+"-"+i} name={"inputnickNEW-"+new3+"-"+i} ></input>                        
                                </div>     
                                                                                                                                            
                            </div>  
                            )

                     }
                    
                }


            }


            if(this.state.nrophone>0){
                for(var i=0;i<this.state.nrophone;i++){
                    
                        addphone.push(
                            <div id={"divephone-"+new3+"-"+i} key={"divphone-"+new3+"-"+i} name={"divphone-"+new3+"-"+i}>  
                                <div id={"divephoneA-"+new3+"-"+i} key={"divphoneA-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5 }}>Phone:</ControlLabel>
                                    <input  type="phone" id={"inputphone-"+new3+"-"+i} key={"inputphone-"+new3+"-"+i} name={"inputphone-"+new3+"-"+i} defaultValue={this.props.data["phone"+i]}></input>
                                </div>
                                <div id={"divephoneB-"+new3+"-"+i} key={"divphoneB-"+new3+"-"+i}>                             
                                    <ControlLabel style={{ margin: 5}}>Name:</ControlLabel>
                                    <input  id={"inputnickphone-"+new3+"-"+i} key={"inputnickphone-"+new3+"-"+i} name={"inputnickphone-"+new3+"-"+i} defaultValue={this.props.data["nickname-phone"+i]}></input>                        
                                    
                                
                                <ControlLabel style={{ margin: 8}}>Carrier:</ControlLabel>
                                    <select  id={"carrier-"+new3+"-"+i} key={"carrier-"+new3+"-"+i} name={this.props.data["idcarrier"+i]} value={this.props.data["idcarrier"+i]} onChange={this.changeCarrier} >
                                        {adding2}          
                                    </select>
                                    
                                    {/* <Button  bsStyle="info" bsSize="xs" onClick={this.handleRemoval2} >
                                        <i className="fa fa-times" aria-hidden="true" />
                                    </Button>  */}
                                <input style={{visibility: 'hidden'}} id={"inputidphone-"+new3+"-"+i} key={"inputidphone-"+new3+"-"+i} defaultValue={this.props.data["idPhone"+i]}></input>
                                </div>                                                                                                          
                            </div>  
                            )
    
                    
                    
                }
            }
              // For new phone
            if(this.state.nrophone2>0){
                for(var i=0;i<this.state.nrophone2;i++){
                    if(i==this.state.nrophone2-1)
                    {
                        addphoneNEW.push(
                            <div id={"divephoneNEW-"+new3+"-"+i} key={"divphoneNEW-"+new3+"-"+i} name={"divphoneNEW-"+new3+"-"+i}>  
                                <div id={"divephoneANEW-"+new3+"-"+i} key={"divphoneANEW-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5 }}>Phone:</ControlLabel>
                                    <input type="phone" id={"inputphoneNEW-"+new3+"-"+i} key={"inputphoneNEW-"+new3+"-"+i} name={"inputphoneNEW-"+new3+"-"+i} ></input>
                                </div>
                                <div id={"divephoneBNEW-"+new3+"-"+i} key={"divphoneBNEW-"+new3+"-"+i}>                             
                                    <ControlLabel style={{ margin: 5}}>Name:</ControlLabel>
                                    <input id={"inputnickphoneNEW-"+new3+"-"+i} key={"inputnickphoneNEW-"+new3+"-"+i} name={"inputnickphoneNEW-"+new3+"-"+i} ></input>                        
                                
                                
                                <ControlLabel style={{ margin: 5}}>Carrier:</ControlLabel>
                                    <select id={"carrierNEW-"+new3+"-"+i} key={"carrierNEW-"+new3+"-"+i} name={"carrierNEW-"+new3+"-"+i}  >
                                        {adding2}          
                                    </select>
                                    
                                    <Button  bsStyle="info" bsSize="xs" onClick={this.handleRemovePhone} >
                                        <i className="fa fa-times" aria-hidden="true" />
                                    </Button> 
                                </div>                                                                                                          
                            </div>  
                            )
    
                    }
                    else{
                        addphoneNEW.push(
                            <div id={"divephoneNEW-"+new3+"-"+i} key={"divphoneNEW-"+new3+"-"+i} name={"divphoneNEW-"+new3+"-"+i}>  
                                <div id={"divephoneANEW-"+new3+"-"+i} key={"divphoneANEW-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5 }}>Phone:</ControlLabel>
                                    <input type="phone" id={"inputphoneNEW-"+new3+"-"+i} key={"inputphoneNEW-"+new3+"-"+i} name={"inputphoneNEW-"+new3+"-"+i} ></input>
                                </div>
                                <div id={"divephoneBNEW-"+new3+"-"+i} key={"divphoneBNEW-"+new3+"-"+i}>                             
                                    <ControlLabel style={{ margin: 5}}>Name:</ControlLabel>
                                    <input id={"inputnickphoneNEW-"+new3+"-"+i} key={"inputnickphoneNEW-"+new3+"-"+i} name={"inputnickphoneNEW-"+new3+"-"+i} ></input>                        
                                
                                
                                <ControlLabel style={{ margin: 5}}>Carrier:</ControlLabel>
                                    <select id={"carrierNEW-"+new3+"-"+i} key={"carrierNEW-"+new3+"-"+i} name={"carrierNEW-"+new3+"-"+i}  >
                                        {adding2}          
                                    </select>
                                    
                                   
                                </div>                                                                                                          
                            </div> 
                            )
    
                     }
                    
                }
            }
            

        }
        

        return(
            <div>
            <div >          
                <ControlLabel style={{ margin: 20 }}>Room Name :</ControlLabel>
                <input id={"Rname"+this.props.idRoom} key={"Rname"+this.props.idRoom} name={"Rname"+this.props.idRoom} defaultValue={this.props.data["nameRoom"]}></input>
                <ControlLabel style={{ margin: 10 }}>Wifi :</ControlLabel>
                <select  id={"SelectWIFI"+this.props.idRoom} key="SelectWIFI" name="SelectWIFI" value={this.state.idselected} style={{ margin: 20 }} onChange={this.changeSelect}>
                  {adding}          
                </select>                                                                                                                  
            </div> 
            <Row>
            <div>        
                <Col md={6}>
                    
                    {addemail}
                </Col>
            </div>
            <div>        
                <Col md={6}>
                    
                    {addphone}
                </Col>
            </div>
            </Row>
            <div md={12}>
                <h4>_____________________________________________________________</h4>
            </div>
            <div>        
                <Col md={6}>
                    <ControlLabel style={{ margin: 20 }}>Add Email :</ControlLabel>
                    <Button style={{margin:20}} bsStyle="info" id="buttonAddEmail" key="buttonAddEmail" name="buttonAddEmail" onClick={this.handleAddEmail} >
                    <i className="fa fa-plus" aria-hidden="true" />
                    </Button>
                    {addemailNEW}
                </Col>
            </div>
            <div>        
                <Col md={6}>
                    <ControlLabel style={{ margin: 20 }}>Add Phone :</ControlLabel>
                    <Button style={{margin:20}} bsStyle="info" id="buttonAddPhone" key="buttonAddPhone" name="buttonAddPhone" onClick={this.handleAddPhone}>
                    <i className="fa fa-plus" aria-hidden="true" />
                    </Button>
                    {addphoneNEW}
                </Col>
            </div>
            <Row>

            </Row>
            <input id="nroemails" key="nroemails" style={{visibility: 'hidden'}} defaultValue="0" ></input>
            <input id="nrophones" key="nrophones" style={{visibility: 'hidden'}} defaultValue="0"></input>   
            <input id="roomID" key="roomID" style={{visibility: 'hidden'}} defaultValue="0"></input> 

                    
            </div>
            
        )
    }
}

export default UpdateRoom;

// style={{visibility: 'hidden'}}