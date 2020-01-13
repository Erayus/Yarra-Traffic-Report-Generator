import React, { Component } from 'react';
import LineChart  from '../../components/LineChart/LineChart.component';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBIcon} from "mdbreact";
import Table from '../../components/Table/Table.component';

class VolumeReport extends Component {
    
    state = {
        dataSet: [],
        labels: [],
        data: [],
    }
    componentDidMount() {    
        //If reportingData is already generated
        if (this.props.fullData.length > 0) {
            this.generateReportingData(this.props.fullData);
        }
      }

    generateReportingData = (fullData) => {
            // Filter out unnecessary data and convert date in string to Date
            let dateAndVolumeRecords = fullData.map(record => {
                return { "date_captured": this.dateConverter(record.date_captured),  "volume_per_day": record.volume_per_day}
            });
            // Sort based on date
            let sortedDateAndVolumeRecords = dateAndVolumeRecords.sort((a, b) => a.date_captured - b.date_captured);
            
            // Generate aggregatedData (sum of volume per day based on the date)
            let aggregatedData = this.aggregateData(sortedDateAndVolumeRecords)

            // Calculate the average sum of volume per day
            let averagedDataArray = this.generateFinalData(aggregatedData);
            
            const labelArray = averagedDataArray.map(data => data["date_captured"]);
            const dataArray = averagedDataArray.map(data => data["average_volume_per_day"]);

            this.setState({dataSet: averagedDataArray, labels: labelArray, data: dataArray});
    }

    dateConverter(dateStr){ //dateStr in YYYY-MMM formate (e.g 2020-Feb)
        let monthMap = {"Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun":5,
                        "Jul":6, "Aug":7, "Sep":8, "Oct": 9, "Nov":10, "Dec":11};
        let [year, month] = dateStr.split("-");
        return new Date(+year, monthMap[month]);
    }

    // Input: [{date_captured: value<Date>, volume_per_day: value<Number>}]
    // Output : [
    //  {"YYYY-MM": {
    //      "sum_volume_per_day": sum_of_volumes<Number>
    //      "no_of_records": value<Number>
    // }}]
    aggregateData (sortedDateAndVolumeRecords) {
        return sortedDateAndVolumeRecords.reduce((aggregated, curData) => {
            let key = curData["date_captured"].getFullYear() + '-' + String(+curData["date_captured"].getMonth() + 1)
            // let key = curData[]
            aggregated[key] = aggregated[key] || {};
            aggregated[key]["sum_volume_per_day"] =  aggregated[key]["sum_volume_per_day"] ?  +aggregated[key]["sum_volume_per_day"] + +curData.volume_per_day : +curData.volume_per_day;
            aggregated[key]["no_of_records"] = ++aggregated[key]["no_of_records"] || 1;
            return aggregated;  
        },{});
    }

    // Input: aggregatedData
    // Output: [{"date_captured": "YYYY-MM", "average_volume_per_day": value<Number>}] 
    generateFinalData(aggregatedData) {
        let averagedDataArray = [];
        let id = 0;
        for (let captureDate of Object.keys(aggregatedData)) {
            let averageDataObj = {
                "id": ++id,
                "date_captured": captureDate,
                "average_volume_per_day": (aggregatedData[captureDate]["sum_volume_per_day"] / aggregatedData[captureDate]["no_of_records"]).toFixed(2)
            };
            averagedDataArray.push(averageDataObj)
        } 

        return averagedDataArray
    }

  render() {

    const table = this.state.dataSet.length > 0 ? <Table dataSet={this.state.dataSet}/> : null;
    return (
      <div className="">
        <MDBContainer>
            <MDBRow className="justify-content-center mb-4">
                <MDBCol sm="12" md="8">
                    <div className="rounded z-depth-1 text-center pb-2">
                        <div className="py-3 text-white" style={{backgroundColor: '#33b5e5', fontSize: '20px'}}>
                            <strong>Number Of Records</strong>
                        </div>
                        <div className="text-strong mt-3">
                            <h2><MDBIcon icon="database" /> {this.props.fullData.length}</h2>
                        </div>
                    </div>  
                </MDBCol>
            </MDBRow>
            <MDBRow >
                <MDBCol md="12"lg="8" className="my-3">
                    <LineChart 
                        title="Volume Report" 
                        dataLabel = "Average Daily Traffic Volume Captured Per Month"
                        labels={this.state.labels} 
                        data={this.state.data}/>
                 </MDBCol>
                 <MDBCol md="12" lg="4" className="my-3">
                    {table}
                 </MDBCol>
            </MDBRow>
        </MDBContainer>
       
      </div>
    );
  }

  componentDidUpdate() {    
    //If reportingData is already generated
    if (this.state.data.length === 0) {
        this.generateReportingData(this.props.fullData);
    }
  }
}
const mapPropsToState = (state) => {
    return {
        fullData: state.fullData
    }
}

export default connect(mapPropsToState)(VolumeReport);