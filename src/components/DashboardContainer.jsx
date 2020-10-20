import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import HeaderBar from './HeaderBar.jsx';
import TopRow from './TopRow/TopRow.jsx';
import MiddleRow from './MiddleRow/MiddleRow.jsx';
import BottomRow from './BottomRow/BottomRow.jsx';
import Cookies from 'js-cookie';

const userTokenCookie = Cookies.get('userToken');

function DashboardContainer(props) {
  const [ready, setReady] = useState(false);
  const [aqlData, setAqlData] = useState({});
  const [userToken, setUserToken] = useState(userTokenCookie);
  const [userInfo, setUserInfo] = useState({});

  // fetching user data
  useEffect(() => {
    fetch('/api/user')
      // .then((res) => res.json())
      .then((res) => setUserInfo(res))
      .catch((err) => console.log(err));
  }, [userToken]);

  // fetching user analytics
  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setAqlData(data))
      .then(() => setReady(true))
      .catch((err) => console.log(err));
  }, []);

  return (
    ready && (
      <div id="dashboard-container">
        <HeaderBar />
        <TopRow mutationData={aqlData.mutations} />
        <MiddleRow resolverStats={aqlData.resolverStats} data={aqlData} />
        <BottomRow data={aqlData} />
      </div>
    )
  );
}

export default DashboardContainer;
