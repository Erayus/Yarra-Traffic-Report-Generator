import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import VolumeReport from './containers/VolumeReport/VolumeReport.container';
import SideNav from './components/Navigation/SideNav/SideNav.component';
import SpeedReport from './containers/SpeedReport/SpeedReport.container'
import { Switch, Route } from 'react-router-dom';
class App extends Component {

  // generateReportingDate(a)

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

export default App;
