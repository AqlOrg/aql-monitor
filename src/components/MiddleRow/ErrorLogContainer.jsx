import React from 'react';
import MutationRow from '../BottomRow/MutationRow.jsx';
import LogHeader from '../BottomRow/LogHeader.jsx';

function ErrorLogContainer(props) {
  if(props.length) {
    console.log(props)
    // loop through mutations
    const mutationRows = [];
    for (let el of props.data.errors) {
      mutationRows.push(<MutationRow data={el} key={el.mutationId} />);
    };
  }

  return (
    <div id='ErrorLogContainer'>
      <LogHeader data={props.data.length? props.data: ''} />
      <div className='mutationRows' style={{color: props.length && mutationRows.length ? "red" : "snow"}}>{props.length && mutationRows.length ? mutationRows : "No errors to display. Congrats on the good app"}</div>
    </div>

  );
}

export default ErrorLogContainer;
