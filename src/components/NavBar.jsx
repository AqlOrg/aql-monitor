import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import AqlLogo from '../../public/aqls-site-logo.png';
import { CgCloseO } from 'react-icons/cg';

function logout() {
  Cookies.remove('userToken', { path: ''})
  window.location.reload(false)
}

// const userTokenCookie = Cookies.get('userToken');

function NavBar(props) {
  const dropdownRef= useRef(null);
  const [ready, setReady] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isTokenActive, setIsTokenActive] = useState(false);
  const [userInfo, setUserInfo] = useState({})

  const handleDropdown = () => {
    setIsActive(!isActive);
    setIsTokenActive(false);
  }
  const handleTokenPopup = () => setIsTokenActive(!isTokenActive);

  // fetching user data
  useEffect(() => {
    fetch('/api/user')
    .then(res => res.json())
    .then(res => setUserInfo(res))
    .then(() => setReady(true))
    .catch(err => console.log(err));
  }, [props.userToken]);
 
  // collapse dropdown menu when clicking away
  useEffect(() => {
    const pageClickEvent = (e) => {
      // If the active element exists and is clicked outside of
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsActive(!isActive);
        setIsTokenActive(false);
      }
    };

    // if menu is active, then listen for clicks
    if(isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }

  }, [isActive]);

  return (
    ready && (
      <div id="navbar">
      <Link to="/"><button id="logo"><img src={AqlLogo}></img></button></Link>
        <button id="userbutton" onClick={handleDropdown} className="menu-trigger">{userInfo.username.substring(0,1)}</button>
        <nav ref={dropdownRef} className={`dropdown-menu ${isActive ? 'active' : 'inactive'}`}>
          <ul>
            <li><Link to="/readme"><button id="readmebutton" className="dropdownbutton" onClick={handleDropdown}>View ReadMe</button></Link></li>
            <li>
              <button id="getuuidbutton" className="dropdownbutton" onClick={handleTokenPopup}>Get User Token</button>
              <div className={`token-popup ${isTokenActive ? 'active' : 'inactive'}`}>{props.userToken}    <CgCloseO size={18} onClick={()=>setIsTokenActive(false)}/></div>
            </li>
            <li><button id="logoutbutton" className="dropdownbutton" value="/githublogin" onClick={() => logout()}>Logout</button></li>
          </ul>
        </nav>
      </div>
    )
  );
}

export default NavBar;
