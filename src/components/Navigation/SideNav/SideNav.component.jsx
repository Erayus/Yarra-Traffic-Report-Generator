import React, {Component} from 'react';
import Logo from '../../../logo.svg';
import classes from './SideNav.module.css';
import { MDBIcon } from "mdbreact";


const sideNav = (props) => {
    return  (
        <React.Fragment>
            <div className={classes.SideNav}>
                <div className={classes.Logo}>
                    <img className="mb-3" src={Logo}/>
                </div>
                <nav>
                   <ul>
                       <li><MDBIcon icon="chart-line" className="mr-2"/>Volume Per Day</li>
                       <li><MDBIcon icon="car" className="mr-2"/>Vehicles</li>
                   </ul>
                </nav>
            </div>
        </React.Fragment>
    
    )
}

export default sideNav;