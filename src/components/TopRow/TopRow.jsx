import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import PieChartContainer from './PieChartContainer.jsx';
import LineChartContainer from './LineChartContainer.jsx';

function TopRow(props) {
  return (
    <div id="top-row">
      <PieChartContainer data={props.data} resolverStats={props.resolverStats} id="PieChartContainer" />
      <LineChartContainer mutationData={props.mutationData} id="LineChartContainer" />
    </div>
  );
}

export default TopRow;
