import React from 'react';
import { BrowserRouter as Router, Link, Switch, NavLink } from 'react-router-dom';
import Navbar from './navbar.jsx';
import aqlLogo from '../../../public/littleaql.png';

function LandingPage() {
  return (
    <div>
      <Navbar/>
      <div id="landingdiv">
        <div id="welcome">Welcome to Aql</div>
        <div id="aqlholder">
          <img id="landingAql" src={aqlLogo} />
        </div>
        <div className="buttonholder">
          <Router forceRefresh={true}>
            <NavLink to="/githublogin">
              <button id='loginbutton'>
                Signup/Login
              </button>
            </NavLink>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;