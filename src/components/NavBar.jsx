import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function logout() {
  console.log('this is happening');
  Cookies.remove('userToken', { path: ''})
  window.location.reload(false)
}


function NavBar() {

  return (
    <div id="navbar">
      <span id="logo">Aql</span>
      <button id="userbutton" onClick={() => clickbutton(userName)}>J</button>
      <button id="logoutbutton" value="/githublogin" onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default NavBar;
