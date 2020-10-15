import React from 'react';

function Navbar () {
  return(
    <div>
      <ul id="nav">
        <li><a href="#">Home</a></li>
        <li><a href="#">Team</a></li>
        <button id='loginBtn'>Signup/Login</button>
      </ul>
    </div>
  )
};

export default Navbar;