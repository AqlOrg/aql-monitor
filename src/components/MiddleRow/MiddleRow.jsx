import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import MapContainer from '../MiddleRow/MapContainer.jsx';
import NodeContainer from '../MiddleRow/NodeContainer.jsx';
import StatsContainer from '../MiddleRow/StatsContainer.jsx';

function MiddleRow(props) {
  return (
    <div id="middle-row">
      <MapContainer data={props.data} id="MapContainer" />
      <NodeContainer data={props.data} id="NodeContainer" />
      <StatsContainer data={props.data} id="StatsContainer" />
    </div>
  );
}

export default MiddleRow;
