import React, { useState, useRef, useEffect } from 'react';
import Log from './Log.jsx';

function LogContainer(props) {
  return (
    <div id="LogContainer">
      <div id="box-titles">AQL Log</div>
      <Log data={props.data} />
    </div>
  );
}

export default LogContainer;
