import React, { Component } from "react";
import {
MDBNavbar, MDBIcon, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBCollapse
} from "mdbreact";
import moment from "moment";
import classes from './TopNav.module.css';
const  topNav = (props) => {

  return (
      <MDBNavbar color="elegant-color-dark" dark expand="md" className="mb-5">
        
          <MDBNavbarNav>
                <MDBNavbarBrand>
                <strong className="white-text pl-5" style={{fontSize: '24px'}}>Yarra Traffic Report Generator</strong>
            </MDBNavbarBrand>
          </MDBNavbarNav>
          <MDBNavbarNav right className={classes.RightNav}>
            <MDBNavItem  style={{color: 'white', background: '#4B515D', width: '150px', padding: '10px 0px'}}>
                <MDBIcon far icon="calendar-alt" className="mr-1" /> {moment().format("MMM Do YY")}
            </MDBNavItem>
          </MDBNavbarNav>
      </MDBNavbar>
    );
}


export default topNav;