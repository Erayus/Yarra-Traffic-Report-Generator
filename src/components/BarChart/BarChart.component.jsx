import React from 'react';
import { Chart } from '@bit/primefaces.primereact.chart';


const BarChart = (props) => {

    const data = {
        labels: props.labels,
        datasets: [
          {
            label: props.dataTitle,
            backgroundColor: '#42A5F5',
            data: props.data
          },
        ] 
      };
      const options = {
        title: {
            display: true,
            text: props.title,
            fontSize: 20,
            fontColor: '#3F729B'
        },
        legend: {
            position: 'bottom'
        },
        scales: {
            yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Average Volume Per Day'
            }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
                }]
        } 
    }
    return (
        <div className='content-section implementation'>
            <Chart type='horizontalBar' data={data} options= {options}/>
        </div>
    );
}

export default BarChart;