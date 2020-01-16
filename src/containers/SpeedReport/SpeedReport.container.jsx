import React, { Component } from 'react';
import BarChart  from '../../components/BarChart/BarChart.component';
import {connect} from 'react-redux';

class SpeedReport extends Component {
    componentDidMount() {    
        //If reportingData is already generated
        if (this.props.fullData.length > 0) {
            this.generateReportingData(this.props.fullData);
        }
    }

    generateReportingData = (fullData) => {
        console.log(fullData);
        let aggregatedSpeedBasedOnRoadName = fullData.reduce((resultData, curData) => {
            resultData[curData['road_name']] = resultData[curData['road_name']] || {}
            resultData[curData['road_name']]['speed'] = resultData[curData['road_name']]['speed'] ? +resultData[curData['road_name']]['speed'] + +curData['85th_percentile_speed'] : +curData['85th_percentile_speed'];
            resultData[curData['road_name']]['no_of_records'] = ++resultData[curData['road_name']]['no_of_records']  || 1;
            return resultData;
        }, {});
        console.log(aggregatedSpeedBasedOnRoadName)
    }

    render(){
        return (
            <div>
                <BarChart/>
            </div>
        )
    }

    componentDidUpdate(){
        this.generateReportingData(this.props.fullData);
    }
}

const mapStateToProps = state => {
    return {
        fullData: state.fullData
    }
}

export default connect(mapStateToProps)(SpeedReport);

