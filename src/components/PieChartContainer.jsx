import React, { useState, useRef, useEffect } from 'react';
import PieChart from './PieChart.jsx';

function PieChartContainer(props) {
  return (
    <div id="PieChartContainer">
      <div id="box-titles">Resolover Frequency</div>
      <PieChart
        data={props.data}
        width={160}
        height={160}
        innerRadius={50}
        outerRadius={80}
      />
    </div>
  );
}

export default PieChartContainer;
