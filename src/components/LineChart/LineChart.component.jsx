import React from 'react';
import { Chart } from '@bit/primefaces.primereact.chart';
import classes from './LineChart.module.css';
 const lineChart = (props) => {
    const data = {
    labels:props.labels,
    datasets: [
        {
            label: props.dataLabel,
            data: props.data,
            fill: false,
            borderColor: '#0099CC'
        }
    ]
    };

    const options = {
    title: {
        display: true,
        text: props.title,
        fontSize: 24
    },
    legend: {
        position: 'bottom'
    }
    }
    return (
        <div className={[classes.LineChart, "z-depth-1", "rounded"].join(' ') }>
            <Chart type='line' data={data} options={options} />
        </div>
        
    )
}
export default lineChart;

