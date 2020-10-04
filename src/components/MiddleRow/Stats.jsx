import React, { useRef, useEffect, useState } from 'react';

/**
 * Component that renders a Map
 */

function Stats(props) {
  return (
    <div id="stats">
      <p>Number of Subscriptions: {props.data.length}</p>
    </div>
  );
}

export default Stats;
