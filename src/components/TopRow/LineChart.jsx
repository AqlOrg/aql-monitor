import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

function LineChart(props) {
    let [avgLatency, setAvgLatency] = useState(
      props.mutationData.map((elt) => parseInt(elt.avgLatency))
    );
    let [avgSubscribers, setAvgSubscribers] = useState(
      props.mutationData.map((elt) => parseInt(elt.expectedAqls))
    );
    let times = props.mutationData.map((el) => moment(parseInt(el.dateTime)));
    console.log(props);
    const data = {
      labels: times,
      datasets: [
        {
          label: 'Subscribers',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'dodgerblue',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'dodgerblue',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'dodgerblue',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: avgSubscribers,
          yAxisID: 'A',
        },
        {
          label: 'Average Latency',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: '#40E0D0',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'dodgerblue',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'dodgerblue',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: avgLatency,
          yAxisID: 'B',
        },
      ],
    };
    const options = {
      legend: {
        display: false,
        padding: 0,
        align: 'center',
        position: 'left',
        labels: {
          boxWidth: 10,
          fontColor: 'lightgrey',
        },
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            position: 'bottom',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MMM D',
              },
              tooltipFormat: 'MMM D, h:mm:ss.SSS a',
            },
            distribution: 'series',
            ticks: {
              maxTicksLimit: 5,
              fontColor: 'lightgrey',
              fontSize: 9,
            },
          },
        ],
        yAxes: [
          {
            id: 'A',
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Subscribers',
              fontColor: 'dodgerBlue',
            },
            ticks: {
              fontColor: 'lightgrey',
              fontSize: 9,
            },
          },
          {
            id: 'B',
            type: 'linear',
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: 'Avg Latency',
              fontColor: 'turquoise',
            },
            ticks: {
              fontColor: 'lightgrey',
              fontSize: 9,
            },
          },
        ],
      },
    };

    const handleClick = () => {
      const newLatency = avgLatency;
      newLatency.pop();
      const newSubs = avgSubscribers;
      newSubs.pop();
      setAvgLatency(newLatency);
      setAvgSubscribers(newSubs);
    };
  
  return (
    <div className='LineChart'>
      <Line data={data} width={1000} height={250} options={options}></Line>
    </div>
  );
}

export default LineChart;
