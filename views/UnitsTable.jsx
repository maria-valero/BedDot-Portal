
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
//import Image from 'react-bootstrap/Image'
//import { Grid, Row, Col, Alert, Table} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
//import { thArray, tdArray } from "variables/Variables.jsx";

import jQuery from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import All_units from "../components/Tasks/All_untis";
import All_units2 from "../components/Tasks/All_untis2";
global.jQuery = jQuery
global.jquery = jQuery // jquery lowercase  was the solution
global.$ = jQuery
let Bootstrap = require('bootstrap')






class UnitsTable extends Component {

  constructor(props){
    super(props);
    this.state={
      items:[],
      isLoaded:false,
    }
    
  }

  
  componentWillUnmount(){
      clearInterval(this.intervalID);

  }

  componentDidMount(){
    this.getData();

   // this.intervalID =  setInterval(this.getData.bind(this),5000);
  }

  getData = () => {
    //fetch('http://homedots.us/beddot/public/getVision/demotest/1')
    //.then(res=>res.json())
    //.then(json=>{
    //  this.setState({
    //    isLoaded:true,
     //   items:json.people,
    //    images:json.image,
    //  })
    //  this.intervalID = setTimeout(this.getData.bind(this),5000);
   // })

  }
  
  render() {
    var { isLoaded , items, images} = this.state;
    //if(!isLoaded){
    //  return <div>Loading...</div>;
    //}
    //else{
      
      return (
        <div className="content">


          
            <Card
                title="Available Units"
                content={
                  <div className="table-full-width">
                    
                      <All_units2 />
                    
                   </div>
                 }
                
             />
           
       </div>
      );
    //}
  }
}

export default UnitsTable;
