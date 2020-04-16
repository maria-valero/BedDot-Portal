import React, { Component } from "react";
import {ControlLabel,Button,Col,Row} from "react-bootstrap";


export class AddRoom extends Component {
    
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
         } 
    }
    //****COMPONENTS FUNCTIONS */
    componentDidMount(){    
       this.getWifi();  
       this.getCarrier();     
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
        console.log(value)
        
      };

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
        console.log(this.state.carriers);
        })    
    }


    handleAddEmail = async(e) => {
        var nemail = this.state.nroemail + 1;
        await this.setState({
            nroemail : nemail,
        })
        document.getElementById("nroemails").value=nemail
    }
    handleRemoveEmail = async(e) => {
        var nemail = this.state.nroemail - 1;
        await this.setState({
            nroemail : nemail,
        })
        document.getElementById("nroemails").value=nemail
    }
    handleAddPhone = async(e) => {
        var nemail = this.state.nrophone + 1;
        await this.setState({
            nrophone : nemail,
        })
        document.getElementById("nrophones").value=nemail
    }
    handleRemovePhone = async(e) => {
        var nemail = this.state.nrophone - 1;
        await this.setState({
            nrophone : nemail,
        })
        document.getElementById("nrophones").value=nemail
    }


    
    render(){

        var { isLoaded , wifis, carriers} = this.state;
        var id_wifi = [];
        var ssid = [];
        var password = [];
        var adding = [];
        var addemail = [];
        var addphone = [];
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
                    if(i==this.state.nroemail-1)
                    {
                        addemail.push(
                            <div id={"divemail-"+new3+"-"+i} key={"divmail-"+new3+"-"+i} name={"divmail-"+new3+"-"+i}>                                              
                                <div id={"divemailA-"+new3+"-"+i} key={"divmailA-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5 }}>Email:</ControlLabel>
                                    <input type="email" id={"inputemail-"+new3+"-"+i} key={"inputemail-"+new3+"-"+i} name={"inputemail-"+new3+"-"+i}></input>
                                </div>
                                <div id={"divemailB-"+new3+"-"+i} key={"divmailB-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5}}>Name:</ControlLabel>
                                    <input id={"inputnick-"+new3+"-"+i} key={"inputnick-"+new3+"-"+i} name={"inputnick-"+new3+"-"+i}></input>                        
                                
                                    <Button  bsStyle="info" bsSize="xs" onClick={this.handleRemoveEmail}>
                                        <i className="fa fa-times" aria-hidden="true" />
                                    </Button> 
                                </div>        
                                                                                                                                              
                            </div>  
                            )

                    }
                    else{
                        addemail.push(
                            <div id={"divemail-"+new3+"-"+i} key={"divmail-"+new3+"-"+i} name={"divmail-"+new3+"-"+i}>          
                                <div id={"divemailA-"+new3+"-"+i} key={"divmailA-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5 }}>Email:</ControlLabel>
                                    <input type="email" id={"inputemail-"+new3+"-"+i} key={"inputemail-"+new3+"-"+i} name={"inputemail-"+new3+"-"+i}></input>
                                </div>
                                <div id={"divemailB-"+new3+"-"+i} key={"divmailB-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5}}>Name:</ControlLabel>
                                    <input id={"inputnick-"+new3+"-"+i} key={"inputnick-"+new3+"-"+i} name={"inputnick-"+new3+"-"+i}></input>                        
                                </div>     
                                                                                                                                            
                            </div>  
                            )

                     }
                    
                }


            }
            if(this.state.nrophone>0){
                for(var i=0;i<this.state.nrophone;i++){
                    if(i==this.state.nrophone-1)
                    {
                        addphone.push(
                            <div id={"divephone-"+new3+"-"+i} key={"divphone-"+new3+"-"+i} name={"divphone-"+new3+"-"+i}>  
                                <div id={"divephoneA-"+new3+"-"+i} key={"divphoneA-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5 }}>Phone:</ControlLabel>
                                    <input type="phone" id={"inputphone-"+new3+"-"+i} key={"inputphone-"+new3+"-"+i} name={"inputphone-"+new3+"-"+i}></input>
                                </div>
                                <div id={"divephoneB-"+new3+"-"+i} key={"divphoneB-"+new3+"-"+i}>                             
                                    <ControlLabel style={{ margin: 5}}>Name:</ControlLabel>
                                    <input id={"inputnickphone-"+new3+"-"+i} key={"inputnickphone-"+new3+"-"+i} name={"inputnickphone-"+new3+"-"+i}></input>                        
                                
                                
                                <ControlLabel style={{ margin: 8}}>Carrier:</ControlLabel>
                                    <select id={"carrier-"+new3+"-"+i} key={"carrier-"+new3+"-"+i} name={"carrier-"+new3+"-"+i}   >
                                        {adding2}          
                                    </select>
                                    
                                    <Button  bsStyle="info" bsSize="xs" onClick={this.handleRemovePhone}>
                                        <i className="fa fa-times" aria-hidden="true" />
                                    </Button> 
                                </div>                                                                                                          
                            </div>  
                            )
    
                    }
                    else{
                        addphone.push(
                            <div id={"divephone-"+new3+"-"+i} key={"divphone-"+new3+"-"+i} name={"divphone-"+new3+"-"+i}>                                              
                                    <div id={"divephoneA-"+new3+"-"+i} key={"divphoneA-"+new3+"-"+i}>
                                    <ControlLabel style={{ margin: 5 }}>Phone:</ControlLabel>
                                    <input type="phone" id={"inputphone-"+new3+"-"+i} key={"inputphone-"+new3+"-"+i} name={"inputphone-"+new3+"-"+i}></input>
                                </div>      
                                <div id={"divephoneB-"+new3+"-"+i} key={"divphoneB-"+new3+"-"+i}>                             
                                    <ControlLabel style={{ margin: 5}}>Name:</ControlLabel>
                                    <input id={"inputnickphone-"+new3+"-"+i} key={"inputnickphone-"+new3+"-"+i} name={"inputnickphone-"+new3+"-"+i}></input>                                                            
                                  
                                <ControlLabel style={{ margin: 8}}>Carrier:</ControlLabel>
                                <select id={"carrier-"+new3+"-"+i} key={"carrier-"+new3+"-"+i} name={"carrier-"+new3+"-"+i}  >
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
                <input id={"Rname"} key={"Rname"} name={"Rname"}></input>
                <ControlLabel style={{ margin: 10 }}>Wifi :</ControlLabel>
                <select id="SelectWIFI" key="SelectWIFI" name="SelectWIFI" value={this.state.idselected} style={{ margin: 20 }} onChange={this.changeSelect}>
                  {adding}          
                </select>                                                                                                                  
            </div> 
            <Row>
            <div>        
                <Col md={6}>
                    <ControlLabel style={{ margin: 20 }}>Add Email :</ControlLabel>
                    <Button style={{margin:20}} bsStyle="info" id="buttonAddEmail" key="buttonAddEmail" name="buttonAddEmail" onClick={this.handleAddEmail}>
                    <i className="fa fa-plus" aria-hidden="true" />
                    </Button>
                    {addemail}
                </Col>
            </div>
            <div>        
                <Col md={6}>
                    <ControlLabel style={{ margin: 20 }}>Add Phone :</ControlLabel>
                    <Button style={{margin:20}} bsStyle="info" id="buttonAddPhone" key="buttonAddPhone" name="buttonAddPhone" onClick={this.handleAddPhone}>
                    <i className="fa fa-plus" aria-hidden="true" />
                    </Button>
                    {addphone}
                </Col>
            </div>
            </Row>
            <input id="nroemails" key="nroemails" style={{visibility: 'hidden'}} defaultValue="0"></input>
            <input id="nrophones" key="nrophones" style={{visibility: 'hidden'}} defaultValue="0"></input>            
            </div>
        )
    }
}

export default AddRoom;