import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import LineChartContainer from './LineChartContainer.jsx';

function TopRow(props) {
  return (
    <div id='top-row'>
      <LineChartContainer
        mutationData={props.mutationData}
        id='LineChartContainer'
      />
    </div>
  );
}

export default TopRow;
