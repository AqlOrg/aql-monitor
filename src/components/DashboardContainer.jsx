import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import TopRow from './TopRow/TopRow.jsx';
import MiddleRow from './MiddleRow/MiddleRow.jsx';
import BottomRow from './BottomRow/BottomRow.jsx';
import Cookies from 'js-cookie';

const userTokenCookie = Cookies.get('userToken');

function DashboardContainer(props) {

  const [ready, setReady] = useState(false);
  const [aqlData, setAqlData] = useState({});
  const [userToken, setUserToken] = useState(userTokenCookie);
  const [userInfo, setUserInfo] = useState({}) 

  // fetching user data
  useEffect(() => {
    fetch('/api/user')
    .then(res => res.json())
    .then(res => setUserInfo(res))
    .catch(err => console.log(err));
  }, [userToken]);
  
  // fetching user analytics
  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setAqlData(data))
      .then(() => setReady(true))
      .catch(err => console.log(err));
  }, []);

  return (
    <div id="dashboard-container">
      <TopRow 
        mutationData={Object.keys(aqlData).length? aqlData.mutations : []}
      />
      <MiddleRow 
        resolverStats={Object.keys(aqlData).length? aqlData.mutations: []} 
        data={Object.keys(aqlData).length? aqlData: {}} />
      <BottomRow data={Object.keys(aqlData).length? aqlData: {}} />
    </div>
  );
}


export default DashboardContainer;
