import React from 'react';
import { Chart } from '@bit/primefaces.primereact.chart';


const BarChart = (props) => {

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: '#42A5F5',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
        ] 
      };
    return (
        <div className='content-section implementation'>
            <Chart type='horizontalBar' data={data} />
        </div>
    );
}

export default BarChart;