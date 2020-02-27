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

class TableList extends Component {
  render(){
    return(
      <div className="embed-responsive-item">
        <Iframe url="http://18.222.223.195:3000/d/y1ZuEvFWz/summary?orgId=1&refresh=5s"
        width="100%"
        height="1000"
        id="myId"
        className="embed-responsive-item"
        display="initial"
        position="relative"
        X-Frame-Options="deny"
        />
        
      </div>
    )
  }
}
export default TableList;
///d/y1ZuEvFWz/summary?orgId=1&refresh=5s