import React, { useState, useRef, useEffect } from 'react';
import Stats from './Stats.jsx';

function StatsContainer(props) {
  return (
    <div id="StatsContainer">
      <div id="box-titles">Stats</div>
      <Stats data={props.data} />
    </div>
  );
}

export default StatsContainer;
