import React, { useState } from 'react';
import AqlContainer from './AqlContainer.jsx';

function MutationRow(props) {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };
  const dateTime = new Date(parseInt(props.data.dateTime));
  return (
    <div className='mutation-row'>
      <div className='mutation-data'>
        <div>{dateTime.toLocaleDateString()}</div>
        <div>{dateTime.toLocaleTimeString()}</div>
        <div>{props.data.mutationId}</div>
        <div>{props.data.resolver}</div>
        <div>{props.data.expectedAqls}</div>
        <div>{props.data.avgLatency}</div>
        <div>
          <button onClick={handleClick}>➕</button>
        </div>
      </div>
      {expanded && <AqlContainer data={props.data.aqls} />}
    </div>
  );
}

export default MutationRow;
