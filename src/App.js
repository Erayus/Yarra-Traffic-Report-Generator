import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import VolumeReport from './containers/VolumeReport/VolumeReport.container';
import SideNav from './components/Navigation/SideNav/SideNav.component';
class App extends Component {

  // generateReportingDate(a)

  render() {
    return (
      <div className="App">
        <SideNav/>
        <VolumeReport/>
      </div>
    );
  }
}

export default App;
