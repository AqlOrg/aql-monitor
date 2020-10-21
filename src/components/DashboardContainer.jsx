import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import HeaderBar from './HeaderBar.jsx';
import TopRow from './TopRow/TopRow.jsx';
import MiddleRow from './MiddleRow/MiddleRow.jsx';
import BottomRow from './BottomRow/BottomRow.jsx';
import NoData from './NoData.jsx';

function DashboardContainer(props) {
  const [ready, setReady] = useState(false);
  const [aqlData, setAqlData] = useState({});
  // const [userToken, setUserToken] = useState(userTokenCookie);
  const [userInfo, setUserInfo] = useState({});
  const [date, setDate] = useState({
    start: Date.now() - 86400000,
    end: Date.now(),
  }); // date {start: 1630430, end: 16434345}

  // Helper function to return obj with UNIX day start and end
  const convertTime = (data) => {
    const rangeObj = {};
    rangeObj.start = new Date(data.ReactDatepicker).getTime();
    rangeObj.end = rangeObj.start + 86400000;
    return rangeObj;
  };

  // Helper function to setDate
  const handleDateChange = (date) => {
    // call convert time
    const converted = convertTime(date);
    setDate(converted);
  };

  // fetching user data
  useEffect(() => {
    fetch('/api/user')
      // .then((res) => res.json())
      .then((res) => setUserInfo(res))
      .catch((err) => console.log(err));
  }, []);

  // fetching user analytics
  useEffect(() => {
    const dateFetch = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(date),
    };
    fetch('/api', dateFetch)
      .then((res) => res.json())
      .then((data) => setAqlData(data))
      .then(() => setReady(true))
      .catch((err) => console.log(err));
  }, [date]);

<<<<<<< HEAD
=======
  // console.log('dashboard, ', props.userToken);

>>>>>>> 25cedb191df26fa96aa4d60c016a491555a8e37e
  return (
    ready && (
      <div id="dashboard-container">
        <HeaderBar
          convertTime={convertTime}
          handleDateChange={handleDateChange}
          date={date}
        />
        {!aqlData.noDataFound ? (
          <>
            <TopRow mutationData={aqlData.mutations} />
            <MiddleRow resolverStats={aqlData.resolverStats} data={aqlData} />
            <BottomRow data={aqlData} />
          </>
        ) : (
          <NoData userToken={props.userToken} />
        )}
      </div>
    )
  );
}

export default DashboardContainer;
