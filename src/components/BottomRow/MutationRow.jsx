import React, { useState } from 'react';
import AqlContainer from './AqlContainer.jsx';

function MutationRow(props) {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="mutation-row">
      <div className="mutation-data">
        <div>{props.data.mutationId}</div>
        <div>{props.data.resolver}</div>
        <div>{props.data.expectedAqls}</div>
        <div>{props.data.dateTime}</div>
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
