import React, { useRef } from 'react';
import { BrowserRouter as Router, Link, Switch, NavLink } from 'react-router-dom';
import AboutUs from './AboutUs.jsx';
import { BsPlug } from 'react-icons/bs';
import { TiStarburstOutline } from 'react-icons/ti';
import { CgSmileMouthOpen } from 'react-icons/cg';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';

function LandingContainers() {

  return(
    <div id="landingcontainer">
      <div className="landingcontainer" id="about">
        <div className="containerTitle"><TiStarburstOutline className="infoIcon"/>About Aqls</div>
        <div className="divider"></div>
        <div className="containerContent">Aqls is a full-stack GraphQL subscription analytics module.</div>
      </div>
      <div className="landingcontainer" id="social">
        <div className="containerTitle"><BsPlug className="infoIcon"/>Connect with us</div>
        <div className="divider"></div>
        <div className="containerContent" id="sociallinks">
          <a href="https://github.com/oslabs-beta/Aqls"><span><AiFillGithub style={{marginRight: "10px"}} /></span>https://github.com/oslabs-beta/Aqls</a>
          <a href="https://www.linkedin.com/company/aql-org"><span><AiFillLinkedin style={{marginRight: "10px"}} /></span>https://www.linkedin.com/company/aql-org/</a>
          <a href="http://twitter.com/AqlOrg"><span><AiFillTwitterCircle style={{marginRight: "10px"}} /></span>https://twitter.com/AqlOrg</a>
        </div>
      </div>
      <div className="landingcontainer">
        <div className="containerTitle"><CgSmileMouthOpen className="infoIcon"/>Who we are</div>
        <div className="divider"></div>
        <AboutUs />
      </div>
    </div>
  )
}

export default LandingContainers;