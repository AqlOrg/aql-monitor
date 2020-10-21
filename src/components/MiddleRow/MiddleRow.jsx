import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import PieChartContainer from './PieChartContainer.jsx';
import ErrorLogContainer from './ErrorLogContainer.jsx';

function MiddleRow(props) {
  return (
    <div id='middle-row'>
      <PieChartContainer
        resolverStats={props.resolverStats}
        id='PieChartContainer'
      />
      <ErrorLogContainer data={props.data.errors} />
    </div>
  );
}

export default MiddleRow;
