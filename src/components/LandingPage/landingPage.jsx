import React, { useRef } from 'react';
import { BrowserRouter as Router, Link, Switch, NavLink } from 'react-router-dom';
import Navbar from './oldnav.jsx';
import aqlDude from '../../../public/littleaql.png';
import AqlLogo from '../../../public/Alqs-site-logo.svg';
import monitorBrowser from '../../../public/Aqls-monitor-browser.png';
import { CgArrowDownO } from 'react-icons/cg';
import LandingContainers from './landingContainers.jsx';

function LandingPage() {

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  return (
    <div id="landing">
      <div id="landingdiv">
        <div id="welcome"><AqlLogo className="aqllogo" viewBox="5 12 99 40" id="aqlblue"/></div>
        <img id="browserimage" src={monitorBrowser} />
        <div className="buttonholder">
          <Router forceRefresh={true}>
            <NavLink to="/githublogin">
              <button id='loginbutton'>
                Login with Github
              </button>
            </NavLink>
          </Router>
          <Router forceRefresh={true}>
            <NavLink to="/readme">
              <button id='download'>
                Download Aqls Package
              </button>
            </NavLink>
          </Router>
        </div>
      </div>
      <div class="downarrow" onClick={executeScroll}><CgArrowDownO color={"white"} size={32} /></div>
      <div ref={myRef}>
        <LandingContainers />
      </div>
    </div>
  );
}

export default LandingPage;