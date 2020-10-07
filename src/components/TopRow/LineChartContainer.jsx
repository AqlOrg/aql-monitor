import React, { useState, useRef, useEffect } from 'react';
import LineChart from './LineChart.jsx';

function LineChartContainer(props) {
  return (
    <div id="LineChartContainer">
      <div id="box-titles">Round-Trip</div>
      <LineChart mutationData={props.mutationData} />
      <br />
      <div className="buttons">
        <button onClick={() => setData(dumData.filter((value) => value < 35))}>
          Filter
        </button>
      </div>
    </div>
  );
}

export default LineChartContainer;
