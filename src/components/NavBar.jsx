import React, { useState, useEffect } from 'react';

function Navbar() {
  const [userName, setUserName] = useState('Raql');

  // function clickbutton(userName) {
  //   switch (userName) {
  //     case 'Caql':
  //       setUserName('Jaql');
  //       break;
  //     case 'Jaql':
  //       setUserName('Maql');
  //       break;
  //     case 'Maql':
  //       setUserName('Raql');
  //       break;
  //     case 'Raql':
  //       setUserName('Caql');
  //       break;
  //   }
  // }

  return (
    <div id="navbar">
      <p id="logo">Aql</p>
      {/* <div id="name">Welcome, {userName}</div>
      <button onClick={() => clickbutton(userName)}>Update user</button> */}
    </div>
  );
}

export default Navbar;
