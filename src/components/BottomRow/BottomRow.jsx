import React, { useState, useEffect } from 'react';
// IMPORT COMPONENTS
import LogContainer from './LogContainer.jsx';

function BottomRow(props) {
  return (
    <div id="bottom-row">
      <LogContainer data={props.data.length? props.data: {}} id="LogContainer" />
    </div>
  );
}

export default BottomRow;
