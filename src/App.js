import React, {Component} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import LineChart  from './components/line-chart/line-chart';

class App extends Component {

  state = {
    labels: [],
    data: [],
  }

  componentDidMount() {
    axios.get("https://data.gov.au/data/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%229e26683b-6b30-424e-ace7-59047d811d1c%22")
      .then(res => {
        let fullRecords = res.data.result.records;
        // Filter out unnecessary data and convert date in string to Date
        let dateAndVolumeRecords = fullRecords.map(record => {
          return { "date_captured": this.dateConverter(record.date_captured),  "volume_per_day": record.volume_per_day}
        });
        
        let sortedDateAndVolumeRecords = dateAndVolumeRecords.sort((a, b) => a.date_captured - b.date_captured);
        
        let aggregatedData = sortedDateAndVolumeRecords.reduce((aggregated, curData) => {
          let key = curData["date_captured"].getFullYear() + '-' + String(+curData["date_captured"].getMonth() + 1)
          // let key = curData[]
          aggregated[key] = aggregated[key] || {};
          aggregated[key]["volume_per_day"] =  aggregated[key]["volume_per_day"] ?  +aggregated[key]["volume_per_day"] + +curData.volume_per_day : +curData.volume_per_day;
          aggregated[key]["no_of_records"] = ++aggregated[key]["no_of_records"] || 1;
          return aggregated;  
        },{});

        let reportingData = {};
        for (let captureDate of Object.keys(aggregatedData)) {
          reportingData[captureDate] = aggregatedData[captureDate]["volume_per_day"] / aggregatedData[captureDate]["no_of_records"];
        }

        const labelArray = Object.keys(reportingData);
        const dataArray = Object.keys(reportingData).map(key => reportingData[key]);

        this.setState({labels: labelArray, data: dataArray});


        console.log(aggregatedData);
      })
  }

  dateConverter(dateStr){ //dateStr in YYYY-MMM formate (e.g 2020-Feb)
    let monthMap = {"Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun":5,
                    "Jul":6, "Aug":7, "Sep":8, "Oct": 9, "Nov":10, "Dec":11};
    let [year, month] = dateStr.split("-");
    return new Date(+year, monthMap[month]);
  }

  // generateReportingDate(a)

  render() {
    return (
      <div className="App">
        <LineChart labels={this.state.labels} data={this.state.data}/>
      </div>
    );
  }
}

export default App;
