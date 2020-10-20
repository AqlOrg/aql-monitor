import React, { useState, useRef, useEffect } from 'react';
import LogHeader from './LogHeader.jsx';
import MutationRow from './MutationRow.jsx';

function LogContainer(props) {
  // loop through mutations
  const mutationRows = [];
  for (let el of props.data.mutations) {
    mutationRows.push(<MutationRow data={el} key={el.mutationId} />);
  }

  return (
    <div id='LogContainer'>
      <LogHeader data={props.data} />
      <div className='mutationRows'>{mutationRows}</div>
    </div>
  );
}

export default LogContainer;
