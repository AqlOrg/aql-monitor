import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';

// COMPONENT IMPORTS
import NavBar from './components/NavBar.jsx';
import DashboardContainer from './components/DashboardContainer.jsx';
import Footer from './components/Footer.jsx';
// SCSS
import '../public/scss/application.scss';
import '../public/scss/landingPage.scss';

//import landing page
import LandingPage from '../src/components/LandingPage/landingPage.jsx';
import Cookies from 'js-cookie';

const userTokenCookie = Cookies.get('userToken');


function App() {
  const [ready, setReady] = useState(false);
  const [aqlData, setAqlData] = useState({});
  const [userToken, setUserToken] = useState(userTokenCookie);
  const [userInfo, setUserInfo] = useState({})

  //fetching user data
  useEffect(() => {
    fetch('/api/user')
    .then(res => res.json())
    .then(res => setUserInfo(res))
    .catch(err => console.log(err));
  }, [userTokenCookie]);

  //fetching user analytics
  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setAqlData(data))
      .then(() => setReady(true))
      .catch(err => console.log(err));
  }, []);
  console.log(aqlData);
  return (
    userToken ?
    <div className='App'>
      <NavBar />
      {ready && (
        <DashboardContainer
          data={aqlData}
          mutationData={aqlData.mutations}
          resolverStats={aqlData.resolverStats}
        />
      )}
      <Footer></Footer>
    </div>
    :
    <Router>
    <Route exact path='/' component={LandingPage} />
  </Router>
  )
};

export default App;
