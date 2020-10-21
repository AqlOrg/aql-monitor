import React, { useRef } from 'react';
import { BrowserRouter as Router, Link, Switch, NavLink } from 'react-router-dom';

function LandingContainers() {

  return(
    <div id="landingcontainer">
      <div className="landingcontainer" id="about">About Aqls</div>
      <div className="landingcontainer" id="social">Connect with us</div>
      <div className="landingcontainer" id="aboutus">Who we are</div>
    </div>
  )
}

export default LandingContainers;