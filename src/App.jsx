import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';
import * as d3 from 'd3';
// COMPONENT IMPORTS
import NavBar from './components/NavBar.jsx';
import DashboardContainer from './components/DashboardContainer.jsx';
// SCSS
import '../public/scss/application.scss';
import '../public/scss/landingPage.scss';
// import new dummy data
import dummyData from '../server/sampleDataShape';
//import landing page
import LandingPage from '../src/components/LandingPage/landingPage.jsx';
import Cookies from 'js-cookie';

const userTokenCookie = Cookies.get('userToken');

function App() {
  const [ready, setReady] = useState(false);
  const [aqlData, setAqlData] = useState({});
  const [userToken, setUserToken] = useState(userTokenCookie);
  const [userInfo, setUserInfo] = useState({})
  
  useEffect(() => {
    fetch(`/api/user/${userToken}`)
    .then(res => res.json())
    .then(res => setUserInfo(res))
    .catch(err => console.log(err));
  }, [userTokenCookie]);
  
  useEffect(() => {
    //only return data for my token
    fetch(`/api/${userToken}`)
      .then(res => res.json())
      .then(data => setAqlData(data))
      .then(() => setReady(true))
      .catch(err => console.log(err));
  }, []);

  return (
    userToken ? 
    <div className='App'>
      <NavBar />
      {ready && (
        <DashboardContainer
          dummyData={dummyData}
          data={aqlData}
          mutationData={aqlData.mutations}
          resolverStats={aqlData.resolverStats}
        />
      )}
    </div>
    :
    <Router>
    <Route exact path='/' component={LandingPage} />
  </Router> 
  )
};

export default App;