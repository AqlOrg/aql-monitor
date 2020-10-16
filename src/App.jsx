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

function App() {
  const [ready, setReady] = useState(false);
  const [aqlData, setAqlData] = useState({});
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setAqlData(data))
      .then(() => setReady(true))
      .catch((err) => console.log(err));
  }, []);

  const getUserData = async () => {
    const response = await fetch('/auth/github/callback');
    const data = await response.json();
    setUserData(data);
  };

  return (
    <div className='App'>
      <Router>
      <Route exact path='/' component={LandingPage} />
      {/* <NavBar />
      {ready && (
        <DashboardContainer
          dummyData={dummyData}
          data={aqlData}
          mutationData={aqlData.mutations}
          resolverStats={aqlData.resolverStats}
        />
      )} */}
      </Router>
    </div>
  );
}
export default App;