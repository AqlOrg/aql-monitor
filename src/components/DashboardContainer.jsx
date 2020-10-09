import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import TopRow from './TopRow/TopRow.jsx';
import MiddleRow from './MiddleRow/MiddleRow.jsx';
import BottomRow from './BottomRow/BottomRow.jsx';

function DashboardContainer(props) {

  return (
    <div id="dashboard-container">
      <TopRow 
        dummyData={props.dummyData}
        mutationData={props.mutationData}
        resolverStats={props.resolverStats}
      />
      {/*<MiddleRow data={props.data} />*/}
      <BottomRow data={props.data} />
    </div>
  );
}

export default DashboardContainer;
