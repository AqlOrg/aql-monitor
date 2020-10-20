import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

function logout() {
  Cookies.remove('userToken', { path: ''})
  window.location.reload(false)
}

function NavBar() {
  const dropdownRef= useRef(null);
  const [isActive, setIsActive] = useState(false);
  const handleDropdown = () => setIsActive(!isActive);
  
  // collapse dropdown menu when clicking away
  useEffect(() => {
    const pageClickEvent = (e) => {
      // If the active element exists and is clicked outside of
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsActive(!isActive);
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
    <div id="navbar">
      <span id="logo">Aql</span>
      <button id="userbutton" onClick={handleDropdown} className="menu-trigger">J</button>
      <nav ref={dropdownRef} className={`dropdown-menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
          <li> 
            <button id="logoutbutton" value="/githublogin" onClick={() => logout()}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
