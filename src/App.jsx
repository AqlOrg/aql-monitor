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
import Readme from './components/Readme.jsx';

const userTokenCookie = Cookies.get('userToken');

function App() {
  const [userToken, setUserToken] = useState(userTokenCookie);

  return (
    userToken ?
    <div className='App'>
      <NavBar userToken={userToken} />
      <Switch>
        <Route path="/readme" component={Readme}></Route>
        <Route path="/">
          <DashboardContainer userToken={userToken}/>
        </Route>
      </Switch>
    </div>
    :
    <Router>
      <Route exact path='/' component={LandingPage} />
    </Router>
  )
};

export default App;
