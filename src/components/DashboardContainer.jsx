import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import TopRow from './TopRow.jsx';
// import MiddleRow from './MiddleRow.jsx';
// import BottomRow from './BottomRow.jsx';

function DashboardContainer(props) {
  return (
    <div id="dashboard-container">
      <TopRow data={props.data} />
    </div>
  );
}

export default DashboardContainer;
