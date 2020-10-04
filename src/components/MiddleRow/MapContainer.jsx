import React, { useState, useRef, useEffect } from 'react';
import Map from './Map.jsx';

function MapContainer(props) {
  return (
    <div id="MapContainer">
      <div id="box-titles">Location Heat Map</div>
      <Map data={props.data} />
    </div>
  );
}

export default MapContainer;
