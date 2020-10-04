import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import PieChart from './PieChart.jsx';

function TopRow(props) {
  return (
    <div id="top-row">
      <PieChart
        data={props.data}
        width={200}
        height={200}
        innerRadius={50}
        outerRadius={80}
      />
    </div>
  );
}

export default TopRow;
