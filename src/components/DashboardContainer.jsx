import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import TopRow from './TopRow/TopRow.jsx';
import MiddleRow from './MiddleRow/MiddleRow.jsx';
import BottomRow from './BottomRow/BottomRow.jsx';
import NoData from './NoData.jsx'

function DashboardContainer(props) {
  const [ready, setReady] = useState(false);
  const [aqlData, setAqlData] = useState({});
  
  // fetching user analytics
  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setAqlData(data))
      .then(() => setReady(true))
      .catch(err => console.log(err));
  }, []);

  return (
    ready?
      <div id="dashboard-container">
      <TopRow 
        mutationData={aqlData.mutations}
      />
      <MiddleRow 
        resolverStats={aqlData.resolverStats} 
        data={aqlData} />
      <BottomRow data={aqlData} />
    </div>
    :
    <NoData/>
  );
}


export default DashboardContainer;
