import React from 'react';
import ErrorMutationRow from './ErrorMutationRow.jsx';
import ErrorLogHeader from './ErrorLogHeader.jsx';

function ErrorLogContainer(props) {
  const mutationRows = [];
  if (props.data.length) {
    // loop through mutations
    for (let el of props.data) {
      mutationRows.push(<ErrorMutationRow data={el} key={el.mutationId} />);
    }
  }

  return (
    <div id='ErrorLogContainer'>
      <ErrorLogHeader data={props.data.length ? props.data : ''} />
      <div
        className='mutationRows'
        style={{
          color: props.data.length ? 'red' : 'snow',
        }}
      >
        {mutationRows.length
          ? mutationRows
          : 'No errors to display. Congrats on the good app'}
      </div>
    </div>
  );
}

export default ErrorLogContainer;
