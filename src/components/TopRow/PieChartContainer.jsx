import React, { useState, useRef, useEffect } from 'react';
import PieChart from './PieChart.jsx';

function PieChartContainer(props) {
  return (
    <div id="PieChartContainer">
      <div id="box-titles">Resolver Frequency</div>
      <PieChart
        data={props.data}
        resolverStats={props.resolverStats}
        width={160}
        height={160}
        innerRadius={0}
        outerRadius={80}
      />
    </div>
  );
}

export default PieChartContainer;


