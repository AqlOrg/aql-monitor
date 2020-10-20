import React, { useState, useRef, useEffect } from 'react';
import LogHeader from './LogHeader.jsx';
import MutationRow from './MutationRow.jsx';

function LogContainer(props) {
  if(props.length) {
    // loop through mutations
    const mutationRows = [];
    for (let el of props.data.mutations) {
      mutationRows.push(<MutationRow data={el} key={el.mutationId} />);
    }
  }

  return (
    <div id='LogContainer'>
      <LogHeader data={props.data.length? props.data: 'nothing to display'} />
      <div className='mutationRows'>{props.data.length? mutationRows: 'nothing to display'}</div>
    </div>
  );
}

export default LogContainer;
