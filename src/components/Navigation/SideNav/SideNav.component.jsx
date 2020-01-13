import React, {Component} from 'react';
// import Logo from '../../../logo.sgv';
import classes from './SideNav.module.css';

const sideNav = (props) => {
    return  (
        <React.Fragment>
            <div className={classes.SideNav} onClick={props.closeDrawer}>
                <div className={classes.Logo}>
                    <img src=''/>
                </div>
                <nav>
                   <ul>
                       <li>Volume Per Day</li>
                       <li>Vehicles</li>
                   </ul>
                </nav>
            </div>
        </React.Fragment>
    
    )
}

export default sideNav;