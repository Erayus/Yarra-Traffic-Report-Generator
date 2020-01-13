import React, { Component } from "react";
import {
MDBNavbar, MDBIcon, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBCollapse,
 MDBDropdownMenu
} from "mdbreact";
import moment from "moment";

const  topNav = (props) => {

  return (
      <MDBNavbar color="elegant-color-dark" dark expand="md" className="mb-5">
        
        <MDBCollapse id="navbarCollapse3" navbar>
          <MDBNavbarNav>
                <MDBNavbarBrand>
                <strong className="white-text pl-5">Yarra Traffic Report Generator</strong>
            </MDBNavbarBrand>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem style={{color: 'white', background: '#4B515D', width: '150px', padding: '10px 0px'}}>
                <MDBIcon far icon="calendar-alt" className="mr-1" /> {moment().format("MMM Do YY")}
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
}


export default topNav;