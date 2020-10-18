import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import cookieParser from 'cookie-parser';

function logout() {
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
