import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';
// import logo from './logo.svg';
import './App.css';
import VolumeReport from './containers/VolumeReport/VolumeReport.container';
import SideNav from './components/Navigation/SideNav/SideNav.component';
import SpeedReport from './containers/SpeedReport/SpeedReport.container'
import * as actionTypes from './store/actions/traffic';
import axios from './axios';



class App extends Component {

  // generateReportingDate(a)
  componentDidMount(){
    axios.get()
            .then(res => {
            let fullDate = res.data.result.records;
            this.props.onFetchFullData(fullDate);
    })
  }

  render() {
    return (
      <div className="App">
        <SideNav/>
        <div className="App-content">
          <Switch>
            <Route path='/volume-report' component={VolumeReport}/>
            <Route path='/speed-report' component={SpeedReport}/>
            <Route path='/' component={VolumeReport}/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchFullData: (fullData) => dispatch({type: actionTypes.FETCH_FULLDATA, fullData: fullData})
  }
}

export default connect(null, mapDispatchToProps)(App);
