import React, { useState, useRef, useEffect } from 'react';
import PieChart from './PieChart.jsx';

function PieChartContainer(props) {
  return (
    <div id="PieChartContainer">
      <div id="box-titles">Resolver Frequency</div>
      <PieChart
        resolverStats={props.resolverStats}
      />
    </div>
  );
}

export default PieChartContainer;


