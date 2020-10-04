import React, { useState, useRef, useEffect } from 'react';
import Node from './Node.jsx';

function NodeContainer(props) {
  return (
    <div id="NodeContainer">
      <div id="box-titles">Resolver Relationships</div>
      <Node data={props.data} />
    </div>
  );
}

export default NodeContainer;
