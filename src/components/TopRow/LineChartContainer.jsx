import React, { useState, useRef, useEffect } from 'react';
import LineChart from './LineChart.jsx';

function LineChartContainer(props) {
  const [dumData, setData] = useState(
    Array.from({ length: 100 }, () => Math.round(Math.random() * 100))
  );
  return (
    <div id="LineChartContainer">
      <div id="box-titles">Round-Trip</div>
      <LineChart data={dumData} mutationData={props.mutationData} />
      <br />
      <div className="buttons">
        <button
          onClick={() => setData([...dumData, Math.round(Math.random() * 100)])}
        >
          Add
        </button>
        <button onClick={() => setData(dumData.filter((value) => value < 35))}>
          Filter
        </button>
      </div>
    </div>
  );
}

export default LineChartContainer;
