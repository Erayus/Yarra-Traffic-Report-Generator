import React, { Component } from 'react';
import BarChart  from '../../components/BarChart/BarChart.component';
import {connect} from 'react-redux';

import {aggregateData, averageData} from '../../_shared/helpers';

class SpeedReport extends Component {
     
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
        let aggregatedData = aggregateData(fullData, "road_name", "85th_percentile_speed");
        let averagedDataArray = averageData(aggregatedData, "road_name", "85th_percentile_speed")
        
        averagedDataArray.sort((a, b) => b["85th_percentile_speed"]-a[ "85th_percentile_speed"]);

        const labelArray = averagedDataArray.map(data => data["road_name"]);
        const dataArray = averagedDataArray.map(data => data["85th_percentile_speed"]);

      

        this.setState({tableData: averagedDataArray, labels: labelArray, data: dataArray});
    }

    render(){
        return (
            <React.Fragment>
                <div className="m-5 p-2 z-depth-2 rounded">
                    <BarChart 
                        title="TOP 10 AVERAGE 85TH PERCENTILE SPEED ON STREET" 
                        dataTitle = "Average 85th Percentile Speed"
                        labels={this.state.labels.slice(0, 10)} 
                        data={this.state.data.slice(0, 10)}
                    />
            </div>
            </React.Fragment>
           
        )
    }

    componentDidUpdate(){
        if (this.state.data.length === 0) {
            this.generateReportingData(this.props.fullData);
        }
    }
}

const mapStateToProps = state => {
    return {
        fullData: state.fullData
    }
}

export default connect(mapStateToProps)(SpeedReport);

