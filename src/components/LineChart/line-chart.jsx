import React from 'react';
import { Chart } from '@bit/primefaces.primereact.chart';

 const linechart = (props) => {
    const data = {
    labels:props.labels,
    datasets: [
        {
        label: 'First Dataset',
        data: props.data,
        fill: false,
        borderColor: '#4bc0c0'
        }
    ]
    };

    const options = {
    title: {
        display: true,
        text: 'My Title',
        fontSize: 16
    },
    legend: {
        position: 'bottom'
    }
    }
    return (
        <div style={{ width: 700 }}>
            <Chart type='line' data={data} options={options} />
        </div>
        
    )
}
export default linechart;

