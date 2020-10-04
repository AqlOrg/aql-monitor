import React, { useState, useEffect } from 'react';

function NavBar() {
  // const [userName, setUserName] = useState('Raql');

  return (
    <div id="navbar">
      <span id="logo">Aql</span>
      <button onClick={() => clickbutton(userName)}>J</button>
    </div>
  );
}

export default NavBar;
