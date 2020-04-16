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

import { Card } from "components/Card/Card.jsx";

import { UnitsToApprove } from "components/Tasks/UnitsToApprove.jsx";
import ApprovedRooms from "../components/Tasks/ApprovedRooms";


// import jQuery from 'jquery'
// import 'bootstrap/dist/css/bootstrap.css'
// global.jQuery = jQuery
// global.jquery = jQuery // jquery lowercase  was the solution
// global.$ = jQuery
// let Bootstrap = require('bootstrap')






class Rooms extends Component {

  
  
  
  render() {
    
      return (
        <div className="content">


                      <ApprovedRooms />
         
           
      </div>
      );
    //}
  }
}

export default Rooms;
