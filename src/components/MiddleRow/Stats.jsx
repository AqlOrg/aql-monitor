import React, { useRef, useEffect, useState } from 'react';

/**
 * Component that renders a Map
 */

function Stats(props) {
  return (
    <div id="stats">
      <p>Number of Subscriptions: {props.data.length}</p>
      <p>Most frequent Resolver: LuckyNumber</p>
      <p>Average Subscripton speed: 14ms</p>
      <p>Dropped Subscriptions, Today: 2</p>
      <p>Most active Location: California, USA</p>
    </div>
  );
}

export default Stats;
