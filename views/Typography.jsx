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
import Image from 'react-bootstrap/Image'

import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray} from "variables/Variables.jsx";





class Typography extends Component {

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
    fetch('https://homedots.us/beddot/public/getVision/demotest/1')
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        items:json.people,
        images:json.image,
      })
      this.intervalID = setTimeout(this.getData.bind(this),5000);
    })

  }
  
  render() {
    var { isLoaded , items, images} = this.state;
    if(!isLoaded){
      return <div>Loading...</div>;
    }
    else{
      
      return (
        <div>
        <div className="content">
             Data has been loaded
        </div>
        <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Recognized People"
                category="Based on last picture"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                    {items.map(items=>(
                      <tr key={items.personName}>
                        <td>{items.personName}</td>
                        <td>{items.personConfidence}</td>
                        <td>{items.gesture}</td>
                        <td>{items.gestureConfidence}</td>
                        <td>{items.time}</td>
                      </tr>
                    ))}
                      
                    </tbody>
                  </Table>
                }
              />
            </Col>

            
          </Row>
        </Grid>
      </div>
        <div className="imgContainer">
          <ul>
          {images.map(images=>(
                 <li key={images.personGroup}>
                      {images.time}
                      {images.image}
                 </li>
               ))}
          </ul>
        <ul>
               {images.map(images=>(
                 
                 <Image src={"http://www.homedots.us/beddot/storage/app/FaceRecon/"+images.image} width="600" key={images.image}
                   
                 />
                 
               ))}
               
             </ul>

        </div>
        </div>
      );
    }
  }
}

export default Typography;
