import React, { useState, useRef, useEffect } from 'react';
import Stats from './Stats.jsx';

function StatsContainer(props) {
  // Today's date formatted
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = mm + ' / ' + dd + ' / ' + yyyy;

  return (
    <div id="StatsContainer">
      <div id="box-titles">Stats: {today}</div>
      <Stats data={props.data} />
    </div>
  );
}

export default StatsContainer;
