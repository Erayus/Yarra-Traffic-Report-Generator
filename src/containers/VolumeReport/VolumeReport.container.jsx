import React, { Component } from 'react';
import LineChart  from '../../components/LineChart/LineChart.component';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBIcon} from "mdbreact";

import Table from '../../components/Table/Table.component';
import {aggregateData, averageData} from '../../_shared/helpers';

class VolumeReport extends Component {
    
    state = {
        tableData: [],
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
            // Generate aggregatedData (sum of volume per day based on the date)
            let aggregatedData = aggregateData(fullData, "date_captured", "volume_per_day");
            // Calculate the average sum of volume per day
            let averagedDataArray = averageData(aggregatedData, "date_captured", "volume_per_day");
            
            averagedDataArray.sort((a,b) => {return this.dateConverter(a.date_captured) - this.dateConverter(b.date_captured)});

            const labelArray = averagedDataArray.map(data => data["date_captured"]);
            const dataArray = averagedDataArray.map(data => data["volume_per_day"]);

            this.setState({tableData: averagedDataArray, labels: labelArray, data: dataArray});
    }

    dateConverter(dateStr){ //dateStr in YYYY-MMM formate (e.g 2020-Feb)
        let monthMap = {"Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun":5,
                        "Jul":6, "Aug":7, "Sep":8, "Oct": 9, "Nov":10, "Dec":11};
        let [year, month] = dateStr.split("-");
        return new Date(+year, monthMap[month]);
    }

  
  render() {

    const table = this.state.tableData.length > 0 ? <Table dataSet={this.state.tableData.sort((a, b) => a.id - b.id)}/> : null;

    return (
      <div className="">
        <MDBContainer>
            <MDBRow className="justify-content-center mb-4">
                <MDBCol sm="12" md="8">
                    <div className="rounded z-depth-1 text-center pb-2">
                        <div className="py-3 text-white blue-gradient" style={{fontSize: '20px'}}>
                            <strong>NUMBER OF RECORDS</strong>
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
                        title="Average Daily Traffic Volume Captured Per Month" 
                        dataLabel = "Average Daily Traffic Volume"
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