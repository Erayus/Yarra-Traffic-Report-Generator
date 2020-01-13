import React, {Component} from 'react';
import Logo from '../../../logo.svg';
import classes from './SideNav.module.css';
import {NavLink} from 'react-router-dom'
import { MDBIcon } from "mdbreact";


const sideNav = (props) => {
    return  (
        <React.Fragment>
            <div className={classes.SideNav}>
                <div className={classes.Logo}>
                    <img className="mb-3" src={Logo} alt="Logo"/>
                </div>
                <nav>
                   <ul>
                       <li>
                            <NavLink to="/" activeClassName={classes.active}>

                                <MDBIcon icon="chart-line" className="mr-2"/>Volume Per Day     
                            </NavLink>
                        </li>
                       <li>
                            <NavLink to="/speed-report" activeClassName={classes.active}>
                                <MDBIcon fab icon="cloudscale" className="mr-2"/>85th Percentile Speed
                            </NavLink>
                        </li>
                   </ul>
                </nav>
            </div>
        </React.Fragment>
    
    )
}

export default sideNav;