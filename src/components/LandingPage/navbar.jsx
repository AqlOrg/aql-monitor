import React from 'react';
import { BrowserRouter as Router, Link, Switch, NavLink } from 'react-router-dom';

//  const getUserData = async () => {
//     const response = await fetch('/githublogin');
//     const data = await response.json();
//     setUserData(data);
//   };

function Navbar () {
  return(
    <div>
      <ul id="nav">
        <li><a href="#">Home</a></li>
        <li><a href="#">Team</a></li>
        <Router forceRefresh={true}>
          <NavLink to="/githublogin">
            <button id='loginBtn'>
              Signup/Login
            </button>
          </NavLink>
        </Router>
      </ul>
    </div>
  )
};

export default Navbar;