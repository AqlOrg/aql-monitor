import React from 'react';
import MutationRow from '../BottomRow/MutationRow.jsx';
import LogHeader from '../BottomRow/LogHeader.jsx';

function ErrorLogContainer(props) {
  // loop through mutations
  const mutationRows = [];
  for (let el of props.data.errors) {
    mutationRows.push(<MutationRow data={el} key={el.mutationId} />);
  }

  return (
    <div id='ErrorLogContainer'>
      <LogHeader data={props.data} />
      <div className='mutationRows'>{mutationRows}</div>
    </div>
  );
}

export default ErrorLogContainer;
